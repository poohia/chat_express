var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
		console.log(spool);
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



module.exports = mongoose.model('SpoolContacts', spoolContactsShema);