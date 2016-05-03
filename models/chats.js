var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');
var User = require("./user");


var chats = new mongoose.Schema({
    users : [User],
    themes : String,
    history : String
});

chats.methods.createPrivateChatRoom = function(callback)
{
	var chats = this.model("Chats");
	var user_id = this._user_1;
	var user2_id = this._user_2;
	
	console.log(user_id, user2_id);
	
}

module.exports = mongoose.model('Chats', chats);