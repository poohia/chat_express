var chat_valid = function(){

	//Minimum 6 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet and 1 Number:
	var _password  = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$");
	var _email = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);


	function password(password)
	{
		return _password.test(password) ; 	
	}

	function email(email)
	{
		return _email.test(email) ; 
	}

	return {
		password: password,
		email: email
	}
}();


// Compatib with expressjs
try{
	module.exports  = chat_valid;}
catch(e){

}