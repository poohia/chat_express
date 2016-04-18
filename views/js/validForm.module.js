//var chat_valid = require("../common_modules/validate.module.js");

var validForm = function(){
	var _forms = {
		'login' : '#form_login',
		'signup' : '#form_signup',
		'logout' : '#form_logout',
		'submit_logout' : '#submit_logout'
	}

	function login(){

		var isValid = true;

	    var items = {
	      $email : $("#email"),
	      $password : $("#password_login")
	    }

	    if(chat_valid.password(items.$password.val()))
	    {
	    	items.$password.removeClass("invalid").addClass("valid");
	    }
	    else
	    {
	    	items.$password.removeClass("valid").addClass("invalid");
	    	isValid = false;
	    }
	    return (isValid && token());
	};

	function signup(){
		var isValid = true;

		var items = {
	      $email : $("#email"),
	      $password : $("#password"),
	      $password_again : $("#password_again"),
	    }

	    if(chat_valid.password(items.$password.val()) && (items.$password_again.val() === items.$password.val()) )
	    {
	    	items.$password.removeClass("invalid").addClass("valid");
	    	items.$password_again.removeClass("invalid").addClass("valid");
	    }
	    else
	    {
	    	items.$password.removeClass("valid").addClass("invalid");
	    	items.$password_again.removeClass("valid").addClass("invalid");
	    	isValid = false;
	    }

	    return (isValid && token());
	};

	function logout(e)
	{
		e.stopPropagation();
		if(token())
		{
			$(_forms.logout).submit();
		}
	}
	function token()
	{
		var $token = $("#token");
		if($token.val().length != 0)
			return false;
		else
			return true;
	};

	function init(){
		$(_forms.login).on("submit",login);
		$(_forms.signup).on("submit",signup);
		$(_forms.submit_logout).on("click",logout);

	}

	return {
		init: init
	}

}();