var bcrypt   = require('bcrypt-nodejs');
var crypto = require("crypto");
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(app){
	'use strict';

	function generateHash (message){
			return crypto.createHash('md5').update(message).digest("hex");
	};

	// methods ======================
	// generating a hash
	function  hashUserPassword(password) {
	    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	};

	// checking if password is valid
	 function valisUserPassword(password, password_bdd) {
	    return bcrypt.compareSync(password, password_bdd);
	};

	return {
		generateHash : generateHash,
		hashUserPassword: hashUserPassword,
		valisUserPassword : valisUserPassword
	}
}