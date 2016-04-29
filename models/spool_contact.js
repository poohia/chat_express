var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');

var User = require("./user");

var spoolContactsShema = new mongoose.Schema({
    _user_1 : { type : String, ref : 'User' },
    _user_2 : { type: String, ref : 'User' }
});


spoolContactsShema.methods.saveNoRepeat = function(callback){
	var spoolModel = this.model("SpoolContacts");
	var params =  {'_user_1' : this._user_1, '_user_2':  this._user_2}; 

	spoolModel.find(params,function(err, spool){
		if(Object.keys(spool).length  > 0)
		{
			callback(err, spool);
		}
		else
		{
			var spoolcontact = new spoolModel(params) ;
			spoolcontact.save(callback);
		} 
	})
}

spoolContactsShema.methods.getContactsOfSpool = function(callback)
{
	var spoolModel = this.model("SpoolContacts");
	var params =  {'_user_2' : this._id }; 
	var my_id = this._id ;
	var users = new Array;
	spoolModel.find(params,function(err, spools){
		async.map(spools, function(spool, done){
			User.findOne({"_id" : spool._user_1},"local.name local.avatar")
			.where('_id').ne(my_id)
			.exec(function(err, user){
				 	if(err)
				 	 	done(err);
			 	 	else
			 	 	{
				 		done(null, user);

			 	 	}	
			 	});
		}, function(err, user_array){
			callback(user_array);
		});
	});


}
spoolContactsShema.methods.getMyRequest = function(callback)
{
	var spoolModel = this.model("SpoolContacts");
	var params =  {'_user_1' : this._id }; 
	var my_id = this._id ;
	var users = new Array;
	spoolModel.find(params,function(err, spools){
		async.map(spools, function(spool, done){
			User.findOne({"_id" : spool._user_2},"local.name local.avatar")
			.where('_id').ne(my_id)
			.exec(function(err, user){
				 	if(err)
				 	 	done(err);
			 	 	else
			 	 	{
				 		done(null, user);

			 	 	}	
			 	});
		}, function(err, user_array){
			callback(user_array);
		});
	});


}
module.exports = mongoose.model('SpoolContacts', spoolContactsShema);