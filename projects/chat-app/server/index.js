const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(express.static(path.join(__dirname, '../client')));

const users = {};
const messageHistory = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', ({ username, room }) => {
    socket.join(room);
    users[socket.id] = { username, room };

    if (!messageHistory[room]) messageHistory[room] = [];

    socket.emit('history', messageHistory[room].slice(-50));

    socket.to(room).emit('system', { text: `${username} joined the room`, time: Date.now() });
    io.to(room).emit('userList', getRoomUsers(room));
  });

  socket.on('message', ({ text, room }) => {
    const user = users[socket.id];
    if (!user) return;
    const msg = { username: user.username, text, time: Date.now(), id: socket.id };
    if (!messageHistory[room]) messageHistory[room] = [];
    messageHistory[room].push(msg);
    if (messageHistory[room].length > 200) messageHistory[room].shift();
    io.to(room).emit('message', msg);
  });

  socket.on('typing', ({ room, username }) => {
    socket.to(room).emit('typing', { username });
  });

  socket.on('stopTyping', ({ room }) => {
    socket.to(room).emit('stopTyping');
  });

  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      socket.to(user.room).emit('system', { text: `${user.username} left the room`, time: Date.now() });
      delete users[socket.id];
      io.to(user.room).emit('userList', getRoomUsers(user.room));
    }
    console.log('User disconnected:', socket.id);
  });
});

function getRoomUsers(room) {
  return Object.values(users).filter(u => u.room === room).map(u => u.username);
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Chat server running on port ${PORT}`));
