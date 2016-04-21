var CONTACT = function(){
	function init()
	{

	}

	function addContact(id_user, callback)
	{
		$.post("/user/add/",{'id_user' : id_user})
       .done(callback)
       .fail(function(data){
        console.log(data);
       });   
	};

	function searchContact(tmp_contact, callback)
	{
		$.get("/users/"+ tmp_contact)
		.done(callback)
		.fail(function(data){
			console.log(data);
		})
	};
	function getRequestContact(callback)
	{
		$.get("/user/request")
		.done(callback)
		.fail(function(data){
			console.log(data);
		})
	}

	return {
		init : init,
		addContact: addContact,
		searchContact: searchContact,
		getRequestContact : getRequestContact
	}
}();