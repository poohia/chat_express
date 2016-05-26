var async = require('async');

/**** MODELS ***************************************/
var Contact            = require('./../models/contact');
var Notifications   = require('./../models/notifications');

/**************************************************/


module.exports = function(app){
	'use strict';

    function getNotifications(req, res , next)
    {
          Notifications.find({'user' : req.user._id}, function(err, notification){
              if(err) return res.status(500).send(err);
              res.send(notification);
              Notifications.remove(notification, function(err){
                  if(err) console.log(err);
              });
          });
    }
	
	return {
		getNotifications : getNotifications
	}
}