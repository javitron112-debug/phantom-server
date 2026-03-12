const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Configuración de CORS estricta: Obligatorio para WebRTC cuando el frontend y backend están separados.
const io = new Server(server, {
    cors: {
        origin: "*", // En producción, cambia el asterisco por el dominio HTTPS donde alojes tu walkie.html
        methods: ["GET", "POST"]
    }
});

// Middleware de validación (El cliente webRTC envía la contraseña aquí)
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error("Conexión rechazada: Se requiere contraseña del canal"));
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
    
    // 1. Un nuevo operador solicita conectarse con los que ya están en el canal
    socket.on('request-peers', async () => {
        if (!socket.roomName) return;
        const sockets = await io.in(socket.roomName).fetchSockets();
        sockets.forEach(s => {
            if (s.id !== socket.id) {
                // Ordena a los clientes existentes que envíen una oferta WebRTC al nuevo
                s.emit('user-joined', socket.id);
            }
        });
    });

    // 2. Reenvío estricto de paquetes de señalización (Offer, Answer, ICE Candidates)
    socket.on('webrtc-signal', (payload) => {
        io.to(payload.target).emit('webrtc-signal', {
            sender: socket.id,
            type: payload.type,
            data: payload.data
        });
    });

    // --- LÓGICA TÁCTICA Y PTT ---

    socket.on('ptt-active', () => {
        if (socket.roomName) {
            socket.to(socket.roomName).emit('ptt-active', socket.nickname);
        }
    });

    socket.on('ptt-inactive', () => {
        if (socket.roomName) {
            socket.to(socket.roomName).emit('ptt-inactive', socket.nickname);
        }
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
            // Informa a los clientes P2P para que destruyan las conexiones WebRTC abiertas con esta ID
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
    console.log(`[SERVER] Nodo de señalización operativo en puerto ${PORT}`);
});
