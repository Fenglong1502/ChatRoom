const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(router);
app.use(cors());


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
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', { user: 'admin', message: `${user.username} has left.`})
        }
    })
})

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});