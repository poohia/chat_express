var app = {};
var dirModules = __dirname + "/modules/"

// http://codepen.io/eniotna/pen/xGjWVP

// SERVER
app.server = require(dirModules + 'server')(app);
app.server.create();
//app.server._server = app.server.getServer();


// DATABASE 
app.db = require(dirModules + 'mongoose')(app);
app.db.connect("chat_express");

// SOCKET
app.socket = require('./modules/socket')(app);
app.socket.create();

module.exports = app;