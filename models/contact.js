var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var contactSchema = mongoose.Schema({
    _user_1 : {type : String, ref : 'User' },
    _user_2 : { type: String, ref : 'User' }
});


contactSchema.methods.saveNoRepeat = function(callback){
	var contactModel = this.model("Contact");
	var spoolModel = this.model("SpoolContacts");
	var params =  {'_user_1' : this._user_1, '_user_2':  this._user_2};
	var params2 =  {'_user_1' : this._user_2, '_user_2':  this._user_1};


	contactModel.find(params,function(err, contact){

		if(Object.keys(contact).length  > 0)
		{
			callback(err, contact);
		}
		else
		{

			contactModel.find(params2,function(err, contact2){

				if(Object.keys(contact2).length  > 0)
				{
					callback(err, contact2);
				}
				else
				{	
					var newcontact = new contactModel(params) ;
					newcontact.save(function(err, currContact){
						if(err)
							callback(err, currContact);
						spoolModel.findOneAndRemove(params2, function(err, spool)
							{
								if(err)
									callback(err, null);
								callback();
							});
					});
				}
			});
		} 
	})
};

/*
contactSchema.methods.findContacts = function(callback){
	var contactModel = this.model("Contact");
	var params =  {'_user_1' : this._user_id};
	var params2 =  {'_user_2' : this._user_id};
	contactModel.find(params,function(err, contact){

		if(Object.keys(contact).length  > 0)
		{
			callback(err, contact);
		}
		else
		{
			contactModel.find(params2,function(err, contact){

				if(Object.keys(contact).length  > 0)
				{
					callback(err, contact);
				}
				else
				{
					
				}
			}
		}
    }
}*/

module.exports = mongoose.model('Contact', contactSchema);