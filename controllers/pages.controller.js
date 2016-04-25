var async = require('async');

/**** MODELS ***************************************/
var Contact            = require('./../models/contact');
var spoolContactsShema  = require('./../models/spool_contact');

/**************************************************/


module.exports = function(app){

	function index(req, res , next)
	{
		res.render('index',{'flashMessage' : req.flash("message")});
	}

	function dashboard(req, res, next)
	{
		res.render('dashboard', {'user' : req.user.local});
	   //  async.parallel([
	   //  	// GET CONTACTS
	   //    function(callback){
	   //    var contact = new Contact({'_id' : req.user._id, 'my_id' : req.user._id});
	   //    contact.findContacts(function(err, contacts){
	   //      callback(err, contacts);
	   //    });
	   //  },
	   //     // GET REQUEST CONTACT
	   //  function(callback)
	   //   {
	   //      var spool = new spoolContactsShema({_id : req.user._id});
	   //      spool.getContactsOfSpool(function(err, contacts){
	   //    	console.log(JSON.stringify(contacts), "contacts spool");
	   //        callback(err, contacts);
	   //  	});
	   //  	//callback(null,"test")
	   //   },

	   //  ],function(err, resultats){
	   //  	//console.log(resultats.contact);
    //      	console.log(JSON.stringify(resultats));
			 

	   //   // var _contacts = (contacts !== null)? contacts[0][0] : null;
	   //    //var _spool = (spoolRequest !== null)? spoolRequest : null ;
	   //    res.render('dashboard', {'user' : req.user.local,
	   //   //  'twig_contacts' : _contacts,
 		 // //  'twig_spool'    : _spool
	   //    });
	   //  })

	}

	return {
		index : index,
		dashboard : dashboard
	}
}