

module.exports = function (app) {
	'use strict';
	var socketController = require("./../controllers/socket.controller")(app);
	
	var io  = null ;
    var listUsers = new Array() ;
	
	
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
             socket.on("start_notification", function(data){
                 socket.notification = new Object();
                 socketController.jointRoomNotification(socket, data);
             });
             socket.on("new_notification", function(data){
                socketController.notifications(socket, data); 
             });
             socket.on("disconnect", function(){
                 try{
                     listUsers.splice(getElementToListOfUsers(socket.notification.id), 1);
                 }
                 catch(e)
                 {
                     
                 }
             });
        });
        
    }
    function getElementToListOfUsers(id)
    {
       var index = null ;
       listUsers.forEach(function(element, i){
             if(element === id) 
              {
                 index = i ;
                  return false;
              }
         });
        return index ;
    }
	return{
	    listUsers : listUsers,
        create : create,
        listen : listen,
        getElementToListOfUsers : getElementToListOfUsers
	}
}