var validForm = function(){
	var _forms = {
		'login' : '#form_login'
	}

	function login(){

		var isValid = true;

	    var items = {
	      $name : $("#name"),
	      $password : $("#password")
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
	}

	function token()
	{
		var $token = $("#token");
		if($token.val().length != 0)
			return false;
		else
			return true;
	}

	function init(){
		$(_forms.login).on("submit",login);
	}

	return {
		init: init
	}

}();