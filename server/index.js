const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('We have a new connection!!!');
  
    socket.on('join', ({ username, roomName }, callback ) => {
        const { error, user } = addUser({ id: socket.id, username, roomName});

        if(error){
            return callback(error);
        }

        socket.emit('message', { user:'admin', text: `${user.username}, welcome to the room ${user.roomName}` });
        socket.broadcast.to(user.roomName).emit('message', { user: 'admin', text: `${user.username} has joined!`});

        socket.join(user.roomName);
    })

    socket.on('sendMessage', ( message, callback ) => {
        const user = getUser(socket.id);

        io.to(user.roomName).emit('message', { user: user.username, text: message });

        callback();
    })

    socket.on('disconnect', () => {
      console.log("User has left!!")  
    })
})

app.use(router);

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});