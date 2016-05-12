var socketController = require("./../controllers/socket.controller")();

module.exports = function (app) {
	'use strict';
	
	
	var io  = null ;
	
	function create()
	{
	    this.io = require('socket.io').listen(app.server.getServer());
        this.listen();
	}

    function listen()
    {
        this.io.on('connection', function(socket){
             socket.on('joint room', function(data) {
                 socketController.jointRoom(socket, data);
             });
             socket.on('start typing', function(data){
                 socketController.startTyping(socket, data);
             });
             socket.on('stop typing', function(data){
                 socketController.stopTyping(socket, data);
             });
             socket.on('disconnect user', function(data){
                 socketController.disconnect(socket, data);
             });
             socket.on("message chat", function(data){
                 socketController.messageChat(socket, data);
             });
        });
        
    }
	return{
        create : create,
        listen : listen,
	}
}