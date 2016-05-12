var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');
var User = require("./user");


var chats = new mongoose.Schema({
    users : [{type: Schema.Types.ObjectId, ref: 'User'}],
    themes : String,
    history : String
});

chats.methods.createPrivateChatRoom = function(user1, user2, callback)
{
    var _chats = this.model("Chats");
     _chats.findOne()
     .or([{users : [user1, user2]}, {users : [user2, user1]}])
     .exec( function(err, chat){
         if(err) 
            callback(err, null);
          if(chat === null || chat.length === 0)
             {
                 var _chat = new _chats({users : [user1, user2]});
                 _chat.save(function(err, chat){
                     callback(err, chat);
                 })
             }
             else
               callback(null, chat)
     });
	
}

module.exports = mongoose.model('Chats', chats);