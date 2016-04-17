module.exports = {
    start: function(req, res, next){
    //	console.log(req.originalUrl);
    	module_firewall.getFirewall(req, res, next);
    	
    }
};

var hash = require("./../modules/hash")();
var module_user = require("./../modules/tmpmodel")();


var module_firewall = function(){
	'use strict';
 
	var anonyme = { "name" :  hash.generateHash("ANONYME"),   "homeUrl" : "/" } ;
	var user    = { "name" :    hash.generateHash('USER'),    "homeUrl" : "/dashboard" } ;
	var admin   = { "name" :    hash.generateHash("ADMIN"),   "homeUrl" : "/admin" } ;

	// list of roles
	var roles = [anonyme, user, admin] ; 

	var rules = 	
	{
		"parfeu":[
		 // For add rule put to begin into this json
		 // {"url": {{ RegEx url }}, "role" : [ {"item" : role1}, {"item" : role2} ] }

		    {"url":"^/login/", "role" : [ {"item" : anonyme}, ] },
		    {"url":"^/dashboard", "role": [ {"item" : user}, ] },
		    {"url":"^/logout", "role": [ {"item" : user}, ] },
		    {"url":"^/", "role": [ {"item" : anonyme}, /*{"item" : user},*/] },
		]
	};

	 function getFirewall(req, res, next)
	 {
            if(req.session.user === undefined)
			 	{
			 		req.session.user = module_user.getAnonymeUser() ;
			 	}
	 	    var currRule, currRole;
	 	    var bvalidUrl  = false, bvalidRole = false ; 
	 	    var countRules  =  Object.keys(rules.parfeu).length , countRoles = roles.length;
	 	    var i = 0 , j = 0 , k = 0 ;

	 	    // test if current url exist and if yes get rule of this url
	 	    while( i < countRules )
	 	    {
	 	    	var node_parfeu  = rules.parfeu[i];
	 	    	if(new RegExp(node_parfeu.url).test(req.originalUrl))
	 	    	{
	 	    		currRule = node_parfeu ;
	 	    		bvalidUrl = true;
	 	    		break;
	 	    	}

	 	    	i++ ;
	 	    }

	 	    // test if role of current user exist
	 	    while( j < countRoles)
	 	    {
	 	    	var node_role = roles[j];
	 	    	if(req.session.user.role == node_role.name)
	 	    	{
	 	    		currRole = node_role ;
	 	    		bvalidRole = true;
	 	    		break;
	 	    	}

	 	    	j++ ; 
	 	    }
	 	    // If url and role exist 
	 	    if(bvalidRole && bvalidUrl)
	 	    {
	 	    	var bvalidCurrRole = false ;
	 	    	var countRole = Object.keys(currRule.role).length;

	 	    	while( k < countRole)
	 	    	{
	 	    		var currItem  = currRule.role[k]; 
	 	    		// If rule.role[k].item.ame is same currRole.name
	 	    		if(currItem.item.name == currRole.name)
	 	    		{
	 	    			bvalidCurrRole = true;
	 	    			break;
	 	    		}

	 	    		k++;
	 	    	}


	 	    	if(bvalidCurrRole)
	 	    	{
	 	    		next();
	 	    	}
	 	    	else
	 	    	{
	 	    		res.redirect(currRole.homeUrl);
	 	    	}
	 	    }
	 	    // else return 404 Not Found
	 	    else
	 	    {

	 	    }
	 		

	 };

	return {
		getFirewall : getFirewall
		
	}
}();



