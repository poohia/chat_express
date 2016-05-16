module.exports = {
    start: function(req, res, next){
   
    	module_cookie.getCookie(req, res, next);
    	
    },
    cookie : function(){
    	return module_cookie;
    }
};

var passport = require('passport');
require('./../modules/passport')(passport);

var module_cookie = function()
{
    'use strict';
    function getCookie(req, res, next)
    {
        if(req.cookies.user && !req.user)
        {
            //console.log(req.cookies.user);
            //passport.serializeUser(req.cookies.user,function(){});
            //req.login(req.cookies.user, function(){});
        }
        next();
    }
    
    return {
        getCookie : getCookie
    }
}();