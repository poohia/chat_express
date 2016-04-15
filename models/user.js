var bcrypt   = require('bcrypt-nodejs');

var User = {
	email : string,
	password : String
}

User.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}