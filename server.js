const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);

// --- SERVIR EL FRONTEND (Soluciona el problema de HTTPS/Micrófono) ---
// Cuando entres a la URL de Render, te mostrará tu index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Configuración de CORS
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware de validación de contraseña
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error("Conexión rechazada: Se requiere contraseña"));
    }
    socket.roomPassword = token; 
    next();
});

io.on('connection', (socket) => {
    console.log(`[+] Enlace establecido: ${socket.id}`);

    socket.on('join-room', ({ roomName, nickname }) => {
        socket.join(roomName);
        socket.nickname = nickname;
        socket.roomName = roomName;

        socket.to(roomName).emit('chat-message', {
            user: 'SISTEMA',
            text: `OPERADOR ${nickname} EN LÍNEA.`,
            time: new Date().toLocaleTimeString()
        });

        socket.emit('joined-success');
        updateUserList(roomName);
    });

    // --- NÚCLEO WEBRTC (SEÑALIZACIÓN P2P) ---
    socket.on('request-peers', async () => {
        if (!socket.roomName) return;
        const sockets = await io.in(socket.roomName).fetchSockets();
        sockets.forEach(s => {
            if (s.id !== socket.id) {
                s.emit('user-joined', socket.id);
            }
        });
    });

    socket.on('webrtc-signal', (payload) => {
        io.to(payload.target).emit('webrtc-signal', {
            sender: socket.id,
            type: payload.type,
            data: payload.data
        });
    });

    // --- LÓGICA TÁCTICA Y PTT ---
    socket.on('ptt-active', () => {
        if (socket.roomName) socket.to(socket.roomName).emit('ptt-active', socket.nickname);
    });

    socket.on('ptt-inactive', () => {
        if (socket.roomName) socket.to(socket.roomName).emit('ptt-inactive', socket.nickname);
    });

    socket.on('chat-message', (msg) => {
        if (socket.roomName) {
            io.in(socket.roomName).emit('chat-message', {
                user: socket.nickname,
                text: msg,
                time: new Date().toLocaleTimeString()
            });
        }
    });

    socket.on('send-alert', (alertData) => {
        if (socket.roomName) {
            io.in(socket.roomName).emit('incoming-alert', {
                user: socket.nickname,
                type: alertData.type,
                coords: alertData.coords,
                time: new Date().toLocaleTimeString()
            });
        }
    });

    // --- DESCONEXIÓN ---
    socket.on('disconnect', () => {
        console.log(`[-] Enlace perdido: ${socket.id}`);
        if (socket.roomName) {
            socket.to(socket.roomName).emit('user-disconnected', socket.id);
            socket.to(socket.roomName).emit('chat-message', {
                user: 'SISTEMA',
                text: `OPERADOR ${socket.nickname || 'DESCONOCIDO'} DESCONECTADO.`,
                time: new Date().toLocaleTimeString()
            });
            updateUserList(socket.roomName);
        }
    });
});

async function updateUserList(roomName) {
    const sockets = await io.in(roomName).fetchSockets();
    const users = sockets.map(s => s.nickname).filter(Boolean);
    io.in(roomName).emit('user-list', users);
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`[SERVER] Sistema operativo en puerto ${PORT}`);
});
