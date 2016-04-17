module.exports = {
    start: function(req, res, next){
    //	console.log(req.originalUrl);
    	module_firewall.getFirewall(req, res, next);
    	
    }
};

var hash = require("./hash")();
var module_user = require("./tmpmodel")();


var module_firewall = function(){
	'use strict';

	var anonyme = hash.generateHash("ANONYME");
	var user =  hash.generateHash('USER');
	var admin = hash.generateHash("ADMIN");

	var route_index = "/" ;

	/*var rules = new Array();
	rules["/"] = anonyme;
	rules["/dashboard"] = user ;*/

	var rules = 	
	{
		"parfeu":[
		    {"url":"/", "role": anonyme, "redictUrl" : "/dashboard"},
		    {"url":"/login", "role" : anonyme, "redictUrl" : "/dashboard"},
		    {"url":"/dashboard", "role": user, "redictUrl" : "/"},
		    {"url":"/logout", "role": user, "redictUrl" : "/"},
		],
		"size" : 4
	};

	 function getFirewall(req, res, next)
	 {
	 	console.log(roles.length);
	 	var currUrl = req.originalUrl;
	 	if(req.session.user === undefined)
	 	{
	 		req.session.user = module_user.getAnonymeUser() ;
	 	}
	 	var currRole = req.session.user.role;
	 	

	 	var i = 0;
	 	for(i ; i < rules.size ; i++)
	 	{
	 		var node_parfeu = rules.parfeu[i];
	 		
	 		if(node_parfeu.url === currUrl)
	 		{
	 			if(node_parfeu.role !== currRole)
	 			{
	 			       res.redirect(node_parfeu.redictUrl);
			 	}
			 	else
			 	{
			 		next();
			 		i = rules.size ; 
			 	}

	 		}
	 	}

	 };
	 
	return {
		getFirewall : getFirewall
		
	}
}();



