var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var port = process.env.PORT || 8080;

app.listen(port);

// note, io(<port>) will create a http server for you
var io = require('socket.io')(8080);

io.on('connection', function (socket) {
  io.emit('this', { will: 'be received by everyone'});

  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});