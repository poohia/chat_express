var async = require('async');

/**** MODELS ***************************************/
var Contact            = require('./../models/contact');
var User            = require('./../models/user');
var spoolContactsShema  = require('./../models/spool_contact');
/**************************************************/


module.exports = function(app){

	function getSpeudo(req, res, next)
	{
        res.contentType("json");
        User.findOne({ 'local.name' :  req.params.name }, function(err, user) {
          if (err)
            res.status(500);
          if(user)
          {
             
            res.send( JSON.stringify({speudo: true}));
          }
          else
          {
            res.send( JSON.stringify({speudo: false}));
          }
        });	
	};

	function getSpeudoLike(req, res, next)
	{
		res.contentType("json");
	    User.find({ 'local.name' : new RegExp(req.params.name, "i")},'local.name local.avatar')
	    .where('_id').ne(req.user._id)
	    .exec(
	    function(err, users){
	        if (err)
	           res.status(500);
	        res.send( JSON.stringify({users: users}));
	      });
	};

	function addContact(req, res, next)
	{
		var tmpSpool = new spoolContactsShema({_user_1 : req.user._id, _user_2 : req.body.id_user});
	    tmpSpool.saveNoRepeat(function(err, spool_saved){
	    res.contentType("json");
	        if(err)
	          res.status(500);
	        res.send(JSON.stringify({"work": "finished"}));
	    });
	};

	function getRequestContactAjax(req, res, next)
	{
        res.contentType("json");
        var spool = new spoolContactsShema({_id : req.user._id});
        spool.getContactsOfSpool(function(contacts){
          res.send(contacts);
    	});
	};
	function getMyRequest(req, res, next)
	{
        res.contentType("json");
        var spool = new spoolContactsShema({_id : req.user._id});
        spool.getMyRequest(function(contacts){
          res.send(contacts);
    	});
	}

	function acceptRequest(req, res, next)
	{
		res.contentType("json");
        var contact = new Contact({_user_1 : req.user._id, _user_2 : req.params.id});
        contact.saveNoRepeat(function(err, contact){
            if(err)
              res.send(err);
            else
              res.send(JSON.stringify({"work": "finished"}));
        });
	};

	function refuseRequest(req, res, next)
	{
       res.contentType("json");
        spoolContactsShema.findOneAndRemove({_user_2 : req.user._id, _user_1 : req.params.id}, function(err){
          if(err)
            res.send(err);
          else
              res.send(JSON.stringify({"work": "finished"}));
        });
	};

	function getContactsAjax(req, res, next)
	{
       res.contentType("json");
       var contact = new Contact({'_id' : req.user._id});
       contact.findContacts(function(err, contacts){
         if(err)
         	res.send(err);
         else
         	res.send(contacts);
       });
	};
	
	function deleteContact(req, res, next)
	{
       res.contentType("json");
       var user_id = req.user._id;
       var contact_id = req.params.id;
       Contact
       //.findOneAndRemove({$or : [{ '_user_1': user_id, '_user_2' : contact_id }, { '_user_2': user_id, '_user_1' : contact_id }]})
       .findOneAndRemove()
       .or([{ '_user_1': user_id, '_user_2' : contact_id }, { '_user_2': user_id, '_user_1' : contact_id }])
	   .exec(function(err, contact){
            if(err)
              res.send(err);
            else
              res.send(JSON.stringify({"work": "finished"}));

	   });
	};
	function deleteMyRequest(req, res, next)
	{
		res.contentType("json");
		spoolContactsShema.findOneAndRemove({"_user_1" : req.user._id, "_user_2" : req.params.id})
		.exec(function(err)
		{
			if(err)
		     	res.send(err);
			else
		      res.send(JSON.stringify({"work": "finished"}));
		});
		
	}
	return {
		getSpeudo : getSpeudo,
		getSpeudoLike : getSpeudoLike,
		addContact : addContact,
		getRequestContactAjax : getRequestContactAjax,
		acceptRequest : acceptRequest,
		refuseRequest : refuseRequest,
		getContactsAjax : getContactsAjax,
		deleteContact  : deleteContact,
		getMyRequest : getMyRequest,
		deleteMyRequest : deleteMyRequest
	}
}