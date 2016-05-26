var CONTACT = function(){
	'use strict';
	var _contacts ;
	var _requestContact ;
	var _myRequest ; 

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
		.done(function(data){
			_requestContact = data;
			callback(data);
		})
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
		$.get("/contacts/")
		.done(function(data){
			_contacts = data[0] ;
			callback(data) ;
		})
		.fail(function(data){
			console.log(data);
		})
	};
	function removeContact(id, callback)
	{
		var url = "/contact/" + id;
	   $.ajax({
	   	 url: url,
	   	 type: "DELETE"
	   })
	   .done(callback)
	   .fail(function(data){
	   	console.log(data);
	   })
	};
	function getMyRequest(callback)
	{
		$.get("/my-account/requests/")
		.done(function(data)
		   {
		   	 _myRequest = data;
		   	 callback(data);
		   }
		)
		.fail(function(data){
			console.log(data);
		});
	}

	function findRequestContactById(id)
	{
		for(var i = 0 ; i < _requestContact.length ; i++)
		{
			var contact = _requestContact[i];
			if(contact._id === id)
				return contact ;
		}
	}
	function findContactById(id)
	{
		for(var i = 0 ; i < _contacts.length ; i++)
		{
			var contact = _contacts[i];
			if(contact._id === id)
				return contact ;
		}
	}
	function findMyRequestById(id)
	{
		for(var i = 0 ; i < _myRequest.length ; i++)
		{
			var myrequest = _myRequest[i];
			if(myrequest._id === id)
				return myrequest ;
		}
	}
	function removeMyRequest(id, callback)
	{
		var url = "/my-account/requests/" + id ;
		$.ajax({
		url: url,
	   	type: "DELETE"
		})
		.done(callback)
		.fail(function(data)
		{
			console.log(data)
		}
		);
	}
	return {
		init : init,
		addContact: addContact,
		searchContact: searchContact,
		getRequestContact : getRequestContact,
		acceptRequestContact : acceptRequestContact,
		refuseRequestContact : refuseRequestContact,
		getContacts : getContacts,
		removeContact: removeContact,
		findRequestContactById : findRequestContactById,
		getMyRequest : getMyRequest,
		findContactById : findContactById,
		findMyRequestById : findMyRequestById,
		removeMyRequest : removeMyRequest
	}
}();