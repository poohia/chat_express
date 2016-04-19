module.exports = {
    start: function(req, res, next){

    	module_validate.getValid(req, res, next);
    	
    },
    validate : function(){
    	return module_validate;
    }
};


var hash = require("./../modules/hash")();
var validate  = require("./../views/common_modules/validate.module");

var module_validate = function(){
	'use strict';
 	
 	function getValid(req, res, next)
 	{
 		console.log(req.body);
 		var isValid = true ; 
 		var body = req.body;
 		
 		/*** RULES  for valid body **********/
 		
 		if(body.email !== undefined)
 		{
 			(validate.email(body.email))? '' : isValid = false;
 		}
 		if(body.password !== undefined)
 		{
 			(validate.password(body.password))? '': isValid = false;
 		}
 		if(body.name !== undefined)
 		{
 			(validate.no_Empty(body.name))? '' : isValid = false;
 		}
 		if(body.mobile !== undefined)
 		{
 			(validate.only_Number(body.mobile))? '' : isValid = false;
 		}

 		/************************************/
 		if(isValid)
		{
			next();
		}
		else
		{
			req.flash("message", "error in post information");
			res.redirect("/");
		}
 	}

	return {
		getValid: getValid
	}

}();



