const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let roomsData = {};

io.on('connection', (socket) => {
    let currentRoom = null;
    let myNickname = null;

    socket.on('join-room', ({ roomName, nickname }) => {
        socket.join(roomName);
        currentRoom = roomName;
        myNickname = nickname;

        if (!roomsData[roomName]) {
            roomsData[roomName] = { users: {}, speaker: null };
        }
        roomsData[roomName].users[socket.id] = nickname;

        socket.emit('joined-success');
        io.to(roomName).emit('user-list', Object.values(roomsData[roomName].users));
    });

    socket.on('request-mic', () => {
        if (currentRoom && !roomsData[currentRoom].speaker) {
            roomsData[currentRoom].speaker = myNickname;
            io.to(currentRoom).emit('channel-busy', myNickname);
        }
    });

    socket.on('release-mic', () => {
        if (currentRoom && roomsData[currentRoom].speaker === myNickname) {
            roomsData[currentRoom].speaker = null;
            io.to(currentRoom).emit('channel-free');
        }
    });

    socket.on('audio-chunk', (data) => {
        if (currentRoom) socket.to(currentRoom).emit('audio-stream', data);
    });

    socket.on('chat-message', (text) => {
        if (currentRoom) {
            io.to(currentRoom).emit('chat-message', { 
                user: myNickname, 
                text: text, 
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            });
        }
    });

    socket.on('send-alert', (data) => {
        if (currentRoom) {
            io.to(currentRoom).emit('incoming-alert', { 
                ...data, 
                user: myNickname, 
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            });
        }
    });

    socket.on('disconnect', () => {
        if (currentRoom && roomsData[currentRoom]) {
            delete roomsData[currentRoom].users[socket.id];
            io.to(currentRoom).emit('user-list', Object.values(roomsData[currentRoom].users));
            if (roomsData[currentRoom].speaker === myNickname) {
                roomsData[currentRoom].speaker = null;
                io.to(currentRoom).emit('channel-free');
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => console.log(`PHANTOM ONLINE ${PORT}`));
