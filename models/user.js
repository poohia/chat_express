var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var hash = require("./../modules/hash")();


var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
        name 		 : String,
        numero       : String,
        role         : String,
        avatar       : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});



module.exports = mongoose.model('User', userSchema);