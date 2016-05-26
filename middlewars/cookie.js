module.exports = {
    start: function(req, res, next) {

        module_cookie.getCookie(req, res, next);

    },
    cookie: function() {
        return module_cookie;
    }
};

var passport = require('passport');
require('./../modules/passport')(passport);
var user = require("./../models/user");
var hash = require("./../modules/hash")();

var module_cookie = function() {
    'use strict';

    function getCookie(req, res, next) {
        if (req.cookies.user && !req.user) {
            var splitCookie = req.cookies.user.split(";");
            user.findOne({_id : splitCookie[0]}, function(err, user){
                if(user && (user.local.password === splitCookie[1]))
                {
                   req.login(user, function(err){
                         next();
                      });
                }
                else
                {
                    next();
                }
            });
        }
        else {
            next();
        }

    }

    return {
        getCookie: getCookie
    }
}();