var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');

var User = require("./user");

var spoolContactsShema = new mongoose.Schema({
    _user_1 : { type : String, ref : 'User' },
    _user_2 : { type: String, ref : 'User' }
});

/*spoolContactShema.insert = function(id1, id2)
{
	var currSpool = new spoolContactShema() ;
	currSpool._user_1 = id1 ;
	currSpool._user_2 = id2 ;

}
*/

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
	var users = new Array;
	spoolModel.find(params,function(err, spools){
		 /*spools.forEach(function(spool, index, cabllack2){
		 	User.findOne({"_id" : spool._user_1},"local.name local.avatar" ,function(err, user){
		 		users[user._id] = user;
		 	});
		 	console.log(users);
		 });*/
		//console.log(Object.keys(spools).length);
		
		/*for(var i = 0 ; i < spools.length ; i++)
		{
			var spool = spools[i];

			User.findOne({"_id" : spool._user_1},"local.name local.avatar" ,function(err, user){
				console.log(i);
				users[i] = user ;
			});
			if( (i + 1) == spools.length)
				callback(users) ;
		}*/
		/*User
		.where("_id").in(spools._user_1).exec(function(user){
			console.log(user);
		});*/
		async.map(spools, function(spool, done){
			User.findOne({"_id" : spool._user_1},"local.name local.avatar" ,function(err, user){
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
		/*async.waterfall([
				function(callback){
					for(var i = 0 ; i < spools.length ; i++)
						{
							var spool = spools[i];

							User.findOne({"_id" : spool._user_1},"local.name local.avatar" ,function(err, user){
								users.push(user) ;
							});
							if( (i + 1) == spools.length)
								callback(null, users) ;
						}
				}
			], function (err, result) {
		      callback(result);
		});*/
	});


}

module.exports = mongoose.model('SpoolContacts', spoolContactsShema);