var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

io.on('connection', function(socket) {
    io.emit('user_connected', socket.id + ' connected');

    socket.on('chat_message', function(msg) {
        io.emit('chat_message', socket.id + ": " + msg);
    });

    socket.on('disconnect', function() {
        io.emit('user_disconnected', socket.id + ' disconnected');
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});