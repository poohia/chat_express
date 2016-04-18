var mongoose = require('mongoose');

module.exports = function(app) {
    'use strict';


       var url = 'mongodb://localhost:27017/';

        // Connect to the MongoDB database then load the users and chatRooms collections
       function connect(db) {
            mongoose.connect('mongodb://localhost/' + db);
             var listenner = mongoose.connection;
			listenner.on('error', console.error.bind(console, 'connection error:'));
			/*listenner.once('open', console.log("connected to bdd ! "));*/
        }

    return {
        connect: connect
    }
}