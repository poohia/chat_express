var hash = require("./hash")();


module.exports = function(app){
	'use strict';

	var user = 
		{
			'email' : "jojo94320@gmail.com", 
			'password' : hash.generateHash("Motdepass1"),
			'role'    : hash.generateHash('USER')
		}

	var anonyme = 
		{
			'email' : "anonyme", 
			'password' : "",
			'role'    : hash.generateHash('ANONYME')
		}
	function findOne(){
		return user;
	}

	function getAnonymeUser(){
		return anonyme;
	}

	return {
		findOne : findOne,
		getAnonymeUser:getAnonymeUser
	}
}