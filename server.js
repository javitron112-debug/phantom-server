const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');
const os = require('os');

const app = express();
const server = http.createServer(app);

// --- ESTADO Y TELEMETRÍA ---
const serverStats = { uptime: 0, msgRx: 0, msgTx: 0, vaultSizeBytes: 0, activeRooms: 0 };

// --- SISTEMA DE LOGS Y ALMACENAMIENTO ---
const vaultDir = path.join(__dirname, 'vault');
const logFile = path.join(__dirname, 'phantom_tactical.log');

if (!fs.existsSync(vaultDir)) fs.mkdirSync(vaultDir);

function calculateVaultSize() {
    fs.readdir(vaultDir, (err, files) => {
        if (err) return;
        let totalSize = 0;
        files.forEach(file => totalSize += fs.statSync(path.join(vaultDir, file)).size);
        serverStats.vaultSizeBytes = totalSize;
    });
}
calculateVaultSize();

function writeLog(event, details) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${event}] ${details}\n`;
    fs.appendFileSync(logFile, logEntry);
    console.log(logEntry.trim());
}

const recentAudioMap = new Map(); 

// --- SEGURIDAD PERIMETRAL: FILTRO IP ---
function isIpAuthorized(clientIp) {
    return clientIp.includes('127.0.0.1') || clientIp === '::1' || clientIp.includes('192.168.');
}

function ipFilterMiddleware(req, res, next) {
    const clientIp = req.ip || req.connection.remoteAddress;
    if (isIpAuthorized(clientIp)) {
        next();
    } else {
        writeLog('SECURITY_BLOCK', `Intento de acceso HTTP bloqueado. IP: ${clientIp}`);
        res.status(403).send('<h1>ACCESO DENEGADO: IP NO AUTORIZADA</h1>');
    }
}

// --- RUTAS HTTP ---
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });
app.get('/dashboard', ipFilterMiddleware, (req, res) => { res.sendFile(path.join(__dirname, 'dashboard.html')); });

const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] }, maxHttpBufferSize: 1e8 });

// --- NAMESPACE DE ADMINISTRACIÓN ---
const adminIo = io.of('/admin');
adminIo.use((socket, next) => {
    const clientIp = socket.handshake.address;
    if (!isIpAuthorized(clientIp)) return next(new Error("Acceso denegado: IP no autorizada"));
    if (socket.handshake.auth.token !== "admin_master_2026") return next(new Error("Acceso denegado: Credenciales incorrectas"));
    next();
});

adminIo.on('connection', (socket) => {
    writeLog('ADMIN_LOGIN', `Dashboard activo desde IP: ${socket.handshake.address}`);
    const telemetryInterval = setInterval(async () => {
        const sockets = await io.fetchSockets();
        const mem = process.memoryUsage();
        socket.emit('telemetry-update', {
            cpuLoad: os.loadavg()[0].toFixed(2),
            ramUsed: (mem.rss / 1024 / 1024).toFixed(2),
            ramTotal: (os.totalmem() / 1024 / 1024).toFixed(2),
            connectedUsers: sockets.length,
            activeRooms: io.of("/").adapter.rooms.size,
            uptime: process.uptime(),
            msgRx: serverStats.msgRx,
            msgTx: serverStats.msgTx,
            vaultSize: (serverStats.vaultSizeBytes / 1024 / 1024).toFixed(2)
        });
    }, 2000);
    socket.on('disconnect', () => clearInterval(telemetryInterval));
});

// --- NAMESPACE TÁCTICO ---
io.use((socket, next) => {
    if (!socket.handshake.auth.token) return next(new Error("Conexión rechazada: Se requiere contraseña del canal"));
    next();
});

io.on('connection', (socket) => {
    writeLog('ENLACE', `Conexión entrante IP: ${socket.handshake.address} | ID: ${socket.id}`);

    socket.on('join-room', ({ roomName, nickname }) => {
        socket.join(roomName); socket.nickname = nickname; socket.roomName = roomName;
        writeLog('OPERADOR_JOIN', `[${nickname}] ingresó a [${roomName}]`);
        serverStats.msgTx++;
        socket.to(roomName).emit('chat-message', { user: 'SISTEMA', text: `OPERADOR ${nickname} EN LÍNEA.`, time: new Date().toLocaleTimeString() });
        socket.emit('joined-success');
        updateUserList(roomName);
        if (recentAudioMap.has(roomName)) socket.emit('audio-history', recentAudioMap.get(roomName));
    });

    socket.on('store-audio', (encryptedBuffer) => {
        if (!socket.roomName) return;
        serverStats.msgRx++;
        const audioId = Date.now().toString();
        const fileName = `audio_${socket.roomName}_${audioId}.enc`;
        const filePath = path.join(vaultDir, fileName);

        fs.writeFile(filePath, encryptedBuffer, (err) => {
            if (err) return writeLog('ERROR_IO', `Fallo al guardar audio ${fileName}`);
            serverStats.vaultSizeBytes += encryptedBuffer.length;
            writeLog('AUDIO_VAULT', `Audio cifrado almacenado: ${fileName}`);

            if (!recentAudioMap.has(socket.roomName)) recentAudioMap.set(socket.roomName, []);
            const history = recentAudioMap.get(socket.roomName);
            history.push({ id: audioId, user: socket.nickname, time: new Date().toLocaleTimeString() });
            if (history.length > 5) history.shift();

            serverStats.msgTx++;
            io.in(socket.roomName).emit('audio-history', history);
        });
    });

    socket.on('request-audio', (audioId) => {
        if (!socket.roomName) return;
        serverStats.msgRx++;
        fs.readFile(path.join(vaultDir, `audio_${socket.roomName}_${audioId}.enc`), (err, data) => {
            if (!err) {
                serverStats.msgTx++;
                socket.emit('deliver-audio', { id: audioId, buffer: data });
                writeLog('AUDIO_FETCH', `Operador [${socket.nickname}] recuperó audio ${audioId}`);
            }
        });
    });

    socket.on('request-peers', async () => {
        if (!socket.roomName) return;
        serverStats.msgRx++;
        const sockets = await io.in(socket.roomName).fetchSockets();
        sockets.forEach(s => { if (s.id !== socket.id) { serverStats.msgTx++; s.emit('user-joined', socket.id); } });
    });

    socket.on('webrtc-signal', (payload) => {
        serverStats.msgRx++; serverStats.msgTx++;
        io.to(payload.target).emit('webrtc-signal', { sender: socket.id, type: payload.type, data: payload.data });
    });

    socket.on('ptt-active', () => {
        if (socket.roomName) { serverStats.msgRx++; serverStats.msgTx++; socket.to(socket.roomName).emit('ptt-active', socket.nickname); }
    });

    socket.on('ptt-inactive', () => {
        if (socket.roomName) { serverStats.msgRx++; serverStats.msgTx++; socket.to(socket.roomName).emit('ptt-inactive', socket.nickname); }
    });

    socket.on('chat-message', (msg) => {
        if (socket.roomName) {
            serverStats.msgRx++; serverStats.msgTx++;
            writeLog('MSG_TX', `[${socket.roomName}] ${socket.nickname}: ${msg}`);
            io.in(socket.roomName).emit('chat-message', { user: socket.nickname, text: msg, time: new Date().toLocaleTimeString() });
        }
    });

    socket.on('ping-check', (clientTime) => socket.emit('pong-check', clientTime));

    socket.on('disconnect', () => {
        writeLog('ENLACE_PERDIDO', `Desconexión ID: ${socket.id} | Operador: ${socket.nickname || 'Desconocido'}`);
        if (socket.roomName) {
            serverStats.msgTx++;
            socket.to(socket.roomName).emit('user-disconnected', socket.id);
            socket.to(socket.roomName).emit('chat-message', { user: 'SISTEMA', text: `OPERADOR ${socket.nickname} DESCONECTADO.`, time: new Date().toLocaleTimeString() });
            updateUserList(socket.roomName);
        }
    });
});

async function updateUserList(roomName) {
    const sockets = await io.in(roomName).fetchSockets();
    const users = sockets.map(s => s.nickname).filter(Boolean);
    serverStats.msgTx++; io.in(roomName).emit('user-list', users);
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => writeLog('SISTEMA', `Nodo operativo en puerto ${PORT}. Restricción IP Dashboard activada.`));
