var path = require('path');
var http = require('http');
var express = require('express');
var socketIO = require('socket.io');

var {generateMessage, generateLocationMessage} = require('./utils/message');
var publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('New user connected ');
    socket.emit('welcomeMessage', generateMessage('Admin', "Welcome to the chat app"));

        socket.broadcast.emit('welcomeMessage', generateMessage('Admin', "New user joined"));



    socket.on('createMessage', (message, callback)=>{
        console.log('create message ', message);
        io.emit('newMessage', generateMessage(message.from, message.text))
        callback();

        // io.emit('newMessage', {
        //     name: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });

        // socket.broadcast.emit('newMessage', {
        //     name: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords)=>{
        io.emit('newLocationMessage', generateLocationMessage("Admin", coords.latitude, coords.longitude));
    });

    socket.on('disconnect', ()=>{
        console.log("Disconnected from user");
    });
});

server.listen(port, ()=>{
    console.log("Server is listening on port ", port)
});














