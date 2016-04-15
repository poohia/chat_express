var bcrypt   = require('bcrypt-nodejs');
var crypto = require("crypto");

module.exports = function(app){

	function generateHash (message){
			return crypto.createHash('md5').update(message).digest("hex");
	};

	return {
		generateHash : generateHash,
		}
}