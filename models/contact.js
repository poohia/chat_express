var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var contactSchema = mongoose.Schema({
    _user_1 : {type : Number, ref : 'User' },
    _user_2 : { type: Number, ref : 'User' }
});



module.exports = mongoose.model('Contact', contactSchema);