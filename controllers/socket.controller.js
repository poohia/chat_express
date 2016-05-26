var    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    fs = require('fs');
var smiley  = require("./../views/common_modules/smiley.module");
var Notifications   = require('./../models/notifications');
    
module.exports = function(app){
    'use strict';
    
    function jointRoom(socket, data)
    {
      socket.roomId = data.roomId ;
      socket.user = data.user ; 
      socket.join(data.roomId);
      socket.broadcast.to(data.roomId).emit('new user', data);
    };
    function startTyping(socket, data)
    {
        data.roomId = socket.roomId;
        socket.broadcast.to(socket.roomId).emit('update start typing', data);
    }
    function stopTyping(socket, data)
    {
        data.roomId = socket.roomId ;
        socket.broadcast.to(socket.roomId).emit('update stop typing', data);
    }
    function disconnect(socket, data)
    {
        console.log("disconnect");
        data.roomId = socket.roomId ;
        socket.broadcast.to(socket.roomId).emit('update disconnect', data) ;
    }
	
	function messageChat(socket, data)
	{

        data.message = ent.encode(data.message) ;
        data.message = smiley.dynamizeMessage(data.message);
	    data.roomId = socket.roomId ;
	    socket.broadcast.to(socket.roomId).emit('update message chat', data) ;
	}
	function jointRoomNotification(socket, data)
	{

	    app.socket.listUsers.push(data.id);
	    socket.notification.id = data.id;
	    socket.join(data.id);
	}
	function notifications(socket,data)
	{
	    var indexOfTarget = app.socket.getElementToListOfUsers(data.id_target);
	    if(indexOfTarget === null)
	    {
	         Notifications.create({user: data.id_target, title : data.title_event}, function(err, notification){
	         });
	    }
	    else
	    {
	        socket.broadcast.to(data.id_target).emit("new_notification", data.title_event);
	    }
	    
	}
	return {
        jointRoom : jointRoom,
        startTyping : startTyping,
        stopTyping : stopTyping,
        disconnect : disconnect,
        messageChat : messageChat,
        jointRoomNotification: jointRoomNotification,
        notifications: notifications
	}
}