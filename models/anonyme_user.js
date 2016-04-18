var hash = require("./../modules/hash")();


module.exports = function(app){
	'use strict';

	var anonyme = 
	{ "local" :
		{
			'email' : "anonyme", 
			'password' : "",
			'role'    : hash.generateHash('ANONYME')
		}
	}
	function getAnonymeUser(){
		return anonyme;
	}

	return {
		getAnonymeUser : getAnonymeUser
	}
}