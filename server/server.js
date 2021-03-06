const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', socket => {
    console.log('New User Connected');

    let roomList = users.getRoomList();
    socket.emit('onLoad',roomList);

    socket.on('join', (params, callback) => {
        if(params.room === ""){
            params.room = params.selectRoom
        }
        params.room = params.room.toUpperCase();
        if( !isRealString(params.name) || !isRealString(params.room) ) {
            return callback('Name and Room Name is required');
        }

        if(users.users.filter(user => user.name === params.name && user.room === params.room).length > 0){
            return callback('Display name is not available. Please choose a different user name')
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUsersList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();
    })

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name, message.text));
            callback();

        }
    });

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude,coords.longitude));
        }
        
    })

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUsersList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
        }

    })
})

server.listen(port, () => {
    console.log(`Server Started on Port ${port}`);
})