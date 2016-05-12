var    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    fs = require('fs');
var smiley  = require("./../views/common_modules/smiley.module");
    
module.exports = function(app){

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
	
	return {
        jointRoom : jointRoom,
        startTyping : startTyping,
        stopTyping : stopTyping,
        disconnect : disconnect,
        messageChat : messageChat
	}
}