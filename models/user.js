var bcrypt   = require('bcrypt-nodejs');


module.exports = function(){
	'use strict';

		var model_user = {
			email : string,
			password : String
		};

		model_user.methods.generateHash = function(password){
			return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
		};

		var User = {
			{
				"email" : "jojo94320@gmail.com",
				"password" : "Motdepass1" //model_user.methods.generateHash("Motdepass1")
			}
		};

		User.findOne = function(username, password)
		{
			return User[0];
		};

		return {

			findOne : User.findOne
		}
}