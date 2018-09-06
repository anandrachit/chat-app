const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
    console.log('New User Connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

    socket.on('join', (params, callback) => {
        if( !isRealString(params.name) || !isRealString(params.room)){
            callback('Name and Room Name is required');
        }
        callback();
    })

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage',generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude,coords.longitude))
    })

    socket.on('disconnect', () => {
        console.log('User disconnected from server');
    })
})

server.listen(port, () => {
    console.log(`Server Started on Port ${port}`);
})