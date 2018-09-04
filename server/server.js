const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
    console.log('New User Connected');

    socket.emit('newMessage', {
        from: 'mike',
        text: 'Hey! What is going on?',
        createdAt: 123
    });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage ', newMessage);
    })

    socket.on('disconnect', () => {
        console.log('User disconnected from server');
    })
})

server.listen(port, () => {
    console.log(`Server Started on Port ${port}`);
})