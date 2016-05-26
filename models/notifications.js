var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');
var User = require("./user");


var notification = new mongoose.Schema({
    user : {type: Schema.Types.ObjectId, ref: 'User'},
    title : String,
    value : String
});


module.exports = mongoose.model('Notification', notification);