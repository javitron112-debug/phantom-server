const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const https = require('https');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
    transports: ['websocket', 'polling']
});

// --- SEGURIDAD AVANZADA ---
const ipTracker = {};
const blacklist = {};
const SECRET_KEY = "PHANTOM_SIG_KEY_" + Math.random(); // Firma dinámica por reinicio

const DOS_THRESHOLD = 50;
const BAN_TIME = 3600000;

function trackActivity(ip) {
    const now = Date.now();
    if (blacklist[ip] && now < blacklist[ip]) return false;
    if (!ipTracker[ip]) ipTracker[ip] = { count: 0, start: now };
    if (now - ipTracker[ip].start > 10000) ipTracker[ip] = { count: 1, start: now };
    ipTracker[ip].count++;
    if (ipTracker[ip].count > DOS_THRESHOLD) {
        blacklist[ip] = now + BAN_TIME;
        return false;
    }
    return true;
}

let roomsData = {};

io.on('connection', (socket) => {
    const clientIp = socket.handshake.address;
    let isAuthenticated = false;

    socket.onAny(() => {
        if (!trackActivity(clientIp)) socket.disconnect(true);
    });

    socket.on('join-room', ({ roomName, password, nickname }) => {
        const cleanRoom = String(roomName).substring(0, 20).replace(/[<>]/g, "");
        const cleanNick = String(nickname).substring(0, 15).replace(/[<>]/g, "");

        if (!roomsData[cleanRoom]) {
            roomsData[cleanRoom] = { password, users: {}, speaker: null, emergencyMode: false };
        }
        
        if (password && roomsData[cleanRoom].password !== password) {
            return socket.emit('chat-message', { user: "SISTEMA", text: "⚠️ ERROR DE ACCESO" });
        }

        // Simulación de JWT: Marcamos el socket como autenticado para esta sesión
        isAuthenticated = true; 
        socket.join(cleanRoom);
        roomsData[cleanRoom].users[socket.id] = cleanNick;
        socket.emit('joined-success');
    });

    socket.on('audio-chunk', (data) => {
        if (isAuthenticated && roomsData) {
            socket.to(Array.from(socket.rooms)[1]).emit('audio-stream', data);
        }
    });

    socket.on('send-alert', (d) => {
        if (isAuthenticated) {
            const room = Array.from(socket.rooms)[1];
            if (d.type === 'SOS') {
                roomsData[room].emergencyMode = true;
                roomsData[room].speaker = roomsData[room].users[socket.id];
            }
            io.to(room).emit('incoming-alert', { ...d, user: roomsData[room].users[socket.id], time: new Date().toLocaleTimeString() });
        }
    });

    socket.on('disconnect', () => {
        // Limpieza automática de RAM
        delete ipTracker[clientIp];
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => console.log(`SISTEMA DE ALTA SEGURIDAD ACTIVO`));
