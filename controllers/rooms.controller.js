var async = require('async');

/**** MODELS ***************************************/
var mongoose = require('mongoose');
var Chats            = require('./../models/chats');
/**************************************************/


module.exports = function(app){

	function room(req, res , next)
	{
		res.render('room');
	}
	function room2(req, res, next)
	{
		res.render('room');
	}
	
	function createPrivateRoom(req, res, next)
	{
		res.contentType("json");
		
		var tmp_chat = new Chats();
		tmp_chat.createPrivateChatRoom(req.user._id, req.params.id,
			function(err, chat){
				if(err)
				   res.status(500).send(err);
				 else 
				   res.send(chat); 
			}
		);
	};
	
	
	return {
		room : room,
		room2  : room2,
		createPrivateRoom: createPrivateRoom,
	}
}