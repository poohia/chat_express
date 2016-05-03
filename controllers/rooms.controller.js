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
		console.log(req.user._id, req.params.id);
		var tmp_chat = new Chats(
			{
				_user_1 : req.user._id,
			    _user_2 : req.params.id
				
			});
		tmp_chat.createPrivateChatRoom(function(){
			
		})
	}
	
	
	return {
		room : room,
		room2  : room2,
		createPrivateRoom: createPrivateRoom,
	}
}