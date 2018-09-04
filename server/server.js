const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const {generateMessage} = require('./utils/message');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
    console.log('New User Connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage ', message);
        io.emit('newMessage',generateMessage(message.from, message.text));
        callback('This is from the server');
    })

    socket.on('disconnect', () => {
        console.log('User disconnected from server');
    })
})

server.listen(port, () => {
    console.log(`Server Started on Port ${port}`);
})