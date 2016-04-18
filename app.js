var app = {};
var dirModules = __dirname + "/modules/"
// SERVER
app.server = require(dirModules + 'server')(app);
app.server.create();


// DATABASE 
app.db = require(dirModules + 'mongoose')(app);
app.db.connect("chat_express");
/*
// SOCKET
app.chat = require('./socket/chat')(app);
app.socketRooms = require('./socket/rooms')(app);
app.socketUsers = require('./socket/users')(app);
app.socket = require('./socket/socket')(app);
app.socket.create();
*/
module.exports = app;