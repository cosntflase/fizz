var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');
var session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
  });
var sharedsession = require("express-socket.io-session")(session);

var fizz = require('./fizz/fizz.js');

var router = express();
var server = http.createServer(router);
var io = socketio(server);

router.use(express.static(path.resolve(__dirname, 'client')));
var sockets = [];

router.use(session);

//socketio.use(sharedsession(session));

io.on('connection', function(socket) {
    //socket.handshake.session.stuff = socket.handshake.session.stuff++ || 1;
    //socket.handshake.session.save();
    //console.log(socket.handshake.session);
    //console.log(socket.request.sessionID);
    sockets.push(socket);
    
    fizz.socket(socket);

    socket.on('disconnect', function() {
        sockets.splice(sockets.indexOf(socket), 1);
    });

});

function broadcast(event, data) {
    sockets.forEach(function(socket) {
        socket.emit(event, data);
    });
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    var addr = server.address();
    console.log("Listening at", addr.address + ":" + addr.port);
});

    /*
    messages.forEach(function(data) {
      socket.emit('message', data);
    });
    */


    /*
    socket.on('message', function(msg) {
      var text = String(msg || '');

      if (!text)
        return;

      socket.get('name', function(err, name) {
        var data = {
          name: name,
          text: text
        };

        broadcast('message', data);
        messages.push(data);
      });
    });

    socket.on('identify', function(name) {
      socket.set('name', String(name || 'Anonymous'), function(err) {
        updateRoster();
      });
    });
    

function updateRoster() {
    async.map(
        sockets,
        function(socket, callback) {
            socket.get('name', callback);
        },
        function(err, names) {
            broadcast('roster', names);
        }
    );
}
*/
