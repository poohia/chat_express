var chat_valid = function(){

	//Minimum 6 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet and 1 Number:
	var _password  = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$");

	function password(password)
	{
		return _password.test(password) ; 	
	}


	return {
		password: password
	}
}();