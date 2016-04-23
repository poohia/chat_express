module.exports = {
    start: function(req, res, next){
    	module_firewall.getFirewall(req, res, next);
    	
    },
    firewall : function(){
    	return module_firewall;
    }
};

var hash = require("./../modules/hash")();
var module_user_anonyme = require("./../models/anonyme_user")();
var User            = require('./../models/user');

var async = require('async');


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
		 	{"url":"^/contact/", "role" : [ {"item": user}, ] },
		 	{"url":"^/user/request/", "role" : [ {"item": user}, ] },
		 	{"url":"^/user/", "role" : [ {"item": user}, ] },
		 	{"url":"^/users/", "role" : [ {"item": user}, ] },
		 	{"url":"^/speudo/", "role" : [ {"item": anonyme}, ] },
		 	{"url":"^/my-account", "role" : [ {"item": user}, ] },
		 	{"url":"^/signup/", "role" : [ {"item": anonyme}, ] },
		    {"url":"^/login/", "role" : [ {"item" : anonyme}, ] },
		    {"url":"^/dashboard", "role": [ {"item" : user}, ] },
		    {"url":"^/logout", "role": [ {"item" : user}, ] },
		    {"url":"^/", "role": [ {"item" : anonyme}, /*{"item" : user},*/] },
		]
	};
     
     function getStringRole(role)
     {
     	var i = 0 ;
     	var currRole = hash.generateHash(role);
     	var roleExist = false ;
     	for(i; i < roles.length ; i++)
     		{
     			if(currRole == roles[i].name)
     			{
     				roleExist = true;
     			}
     		}
     	if(roleExist) return currRole  ; else return anonyme.name ;
     }

     function getRoles()
     {
     	return roles ;
     }

     function testUser(email, password, role, testeur)
     {

     }

	 function getFirewall(req, res, next)
	 {
            if(req.user === undefined)
		 	{
		 		req.user = module_user_anonyme.getAnonymeUser() ;
		 	}
		 	var btoken = false, bajax = req.xhr ; 
	 	    var currUser, currRule, currRole;
	 	    var bvalidUrl  = false, bvalidRole = false, bUserExist = true;  ; 
	 	    var countRules  =  Object.keys(rules.parfeu).length , countRoles = roles.length;
	 	    var m = 0,i = 0 , j = 0 , k = 0 ;

	 	    async.parallel([
	 	    	function(callback)
	 	    	{
			 	    if(req.body.token === undefined)
			 	    {
			 	    	btoken = true ;
			 	    }
			 	    else
			 	    {
			 	    	if(req.body.token.length <= 0)
			 	    	{
			 	    		btoken = true ;
			 	    	}
			 	    }
			 	    callback();
	 	    	},

	 	    	function(callback)
	 	    	{
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
			 	    callback();
	 	    	},
	 	    	function(callback)
	 	    	{
	 	    		// test if role of current user exist
			 	    while( j < countRoles)
			 	    {
			 	    	var node_role = roles[j];
			 	    	if(req.user.local.role == node_role.name)
			 	    	{
			 	    		currRole = node_role ;
			 	    		bvalidRole = true;
			 	    		break;
			 	    	}

			 	    	j++ ; 
			 	    }
			 	    callback();
	 	    	},
	 	    	function(callback)
	 	    	{
	 	    		// test curr user than the databases
	 	    		if(req.user.local.role !== anonyme.name)
		 	    	{
		 	           User.findOne({ 'local.email' :  req.user.local.email }, function(err, user) {
				     		if(err || !user )
				     			bUserExist = false;

				     		if(user && (req.user.local.password !== user.local.password) && (req.user.local.role !== user.local.role) )
				            {
				                bUserExist = false;
				            }

				            if(user)
				            {

				            	bUserExist = true;
				            }
		 	    		callback();
				     	});
		 	    	}
		 	    	else
		 	    		callback();
	 	    	}

	 	    	],function(results){
			 	    // If url and role exist  and token  is empty and test if user exist
			 	    if(bvalidRole && bvalidUrl  && btoken && bUserExist)
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


			 	    	//if(bajax) console.log(req.user.local); 
			 	    	if(bvalidCurrRole  )
			 	    	{
			 	    		next();
			 	    	}
			 	    	else
			 	    	{
			 	    		if(bajax)
			 	    		{
			 	    			res.status(500);
			 	    		}
			 	    		else
			 	    		{
			 	    			res.redirect(currRole.homeUrl);
			 	    	    }
			 	    	}
			 	    }
			 	    // else return 404 Not Found
			 	    else
			 	    {
			 	    	req.user = module_user_anonyme.getAnonymeUser() ;
			 	    	res.redirect(anonyme.homeUrl);
			 	    	console.log("Error into firewall");
			 	    }
	 	    	});








	 		

	 };

	return {
		getFirewall : getFirewall,
		getStringRole : getStringRole,
		getRoles : getRoles
		
	}
}();

