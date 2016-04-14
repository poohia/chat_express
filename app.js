var app = {};
var dirModules = __dirname + "/modules/"
// SERVER
app.server = require(dirModules + 'server')(app);
app.server.create();
/*
app.db = require('./model/db')(app);
app.db.connect();
app.rooms = require('./model/rooms')(app);
app.users = require('./model/users')(app);

// SOCKET
app.chat = require('./socket/chat')(app);
app.socketRooms = require('./socket/rooms')(app);
app.socketUsers = require('./socket/users')(app);
app.socket = require('./socket/socket')(app);
app.socket.create();
*/
module.exports = app;