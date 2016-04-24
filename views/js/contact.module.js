var CONTACT = function(){
	function init()
	{

	}

	function addContact(id_user, callback)
	{
		$.post("/contact/add/",{'id_user' : id_user})
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
		});
	};
	function getRequestContact(callback)
	{
		$.get("/contact/request")
		.done(callback)
		.fail(function(data){
			console.log(data);
		});
	};
	function acceptRequestContact(id, callback)
	{
		$.post("/contact/request/accept/"+id)
		.done(callback)
		.fail(function(data){
			console.log(data);
		});
	};
	function refuseRequestContact(id, callback)
	{
		var url = "/contact/request/refuse/" + id ;
		$.ajax({
			url : url,
			type : "DELETE"
		})
		.done(callback)
		.fail(function(data){
			console.log(data);
		});
	};
	function getContacts(callback)
	{
		$.get("/contacts")
		.done(callback)
		.fail(function(data){
			console.log(data);
		})
	}
	return {
		init : init,
		addContact: addContact,
		searchContact: searchContact,
		getRequestContact : getRequestContact,
		acceptRequestContact : acceptRequestContact,
		refuseRequestContact : refuseRequestContact,
		getContacts : getContacts
	}
}();