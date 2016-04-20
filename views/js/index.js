$(function(){
	INDEX.init();
});

var INDEX = function(){

	var _global = {
		btn_signin : "#signin-btn-header",
		signin_content : ".signin-content",
		btn_signup : "#signup-btn-header",
		speudo    : "#name",
		btn_test_speudo : '#btn_test_speudo'
	};

	function showSignin(){
 		$(_global.signin_content).addClass("slideInDown",function(){
 			if($(this).hasClass("invisible"))
 				$(this).removeClass("invisible");
 			if($(this).hasClass("slideOutUp"))
 				$(this).removeClass("slideOutUp");
 		});
	};
	function showSignup(){
		$(_global.signin_content).addClass("slideOutUp");
	};

	function getSpeudo(e)
	{
		e.preventDefault();
		var speudo_val = $(_global.speudo).val();
		if(speudo_val.length > 0)
		{
			$.get("/speudo/"+speudo_val)
			.done(function(data){
				if(data.speudo)
				{
					$(_global.speudo).removeClass("valid").addClass("invalid");
					 Materialize.toast('Speudo exist', 4000);
				}
				else
				{
					$(_global.speudo).removeClass("invalid").addClass("valid");
				}
			}).fail(function(data)
			{
				console.log(data);
			});
		}
	}

	function init(){
		$(_global.btn_signin).on("click",showSignin);
		$(_global.btn_signup).on("click",showSignup);
		$(_global.speudo).focusout(getSpeudo);
		$(_global.btn_test_speudo).on("click",getSpeudo);
	}


	return{
			init : init
		}
}();