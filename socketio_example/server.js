var app = require('express')();
var http = require('http').createServer(app);
var path = require("path")
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', function (socket) {
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

let port = 8080;
http.listen(port, function () {
    console.log('listening on *:' +port);
});