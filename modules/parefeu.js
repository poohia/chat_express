module.exports = {
    parefeu: function(req, res, next){
    	console.log(req.originalUrl);
    	module_parefeu.getParefeu(req, res, next);
    	
    }
};

var hash = require("./hash")();
var module_user = require("./tmpmodel")();

var module_parefeu = function(){
	'use strict';

	var anonyme = hash.generateHash("ANONYME");
	var user = hash.generateHash('USER') ;
	var admin = hash.generateHash("ADMIN");

	var route_index = "index" ;

	/*var rules = new Array();
	rules["/"] = anonyme;
	rules["/dashboard"] = user ;*/

	var rules = {
	   "route": {
	   	 "url" : "/",
	   	  "role" : anonyme
	   },
		"/" : anonyme,
		"/dashboard" : user
	}

	 function getParefeu(req, res, next)
	 {
	 	try{

	 	 var currrRole = req.session.user.role;
	 	 var currUrl = req.originalUrl;
	 	 console.log(rules);
	 	 //console.log(rules.length());
	 	/* for(var i = 0 ; i < 1; i ++)
	 	 {
	 	 	console.log("i'm here");
	 	 	var key = rules[i];
	 	 	console.log("key=",rules[i]," rule[key]=", rules[key]);
	 	 	if(key === currUrl)
	 	 	{
	 	 		if(rules[key] !== currrRole)
	 	 		{
	 	 			res.redirect(route_index);
	 	 		}
	 	 		else
	 	 		{
	 	 			//console.log("currUrl = " , currUrl, " currrRole = " , currrRole);
	 	 			break;
	 	 		}
	 	 	}
	 	 }*/
	 	 next();

	 	}
	 	catch(e)
	 	{
	 		// set anonyme role
            //req.session.user = module_user.getAnonymeUser() ;
            next();
	 	}
	 }
	
	return {
		getParefeu : getParefeu
		
	}
}();



