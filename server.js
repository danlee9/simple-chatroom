var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var num = 0;

io.on('connection', function (client) {
  console.log('Client connected');
  client.on('join', function(msg) {
  	num++;
  	client.broadcast.emit('message', msg);
  	client.broadcast.emit('change', num);
  	client.emit('change', num);
  });
  client.on('disconnect', function(data) {
  	num--;
    client.broadcast.emit('leave', 'User disconnected');
    client.broadcast.emit('change', num);
  });
  client.on('message', function(message) {
    console.log('Received message:', message);
    client.broadcast.emit('message', message);
    client.emit('message', message);
  });
  client.on('leave', function(message) {
  	// num--;
  	// client.emit('change', num);
  	client.emit('message', message);
  });
});

server.listen(8080);