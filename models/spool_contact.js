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

spoolContactsShema.methods.saveNoRepeat = function(){
	console.log("i'm here!");
	this.model("SpoolContacts").find({'_user_1' : this._user_1, '_user_2':  this._user_2},function(err, spool){
		if(spool.lenght > 0)
		{

		}
		else
		{
			this.model("SpoolContacts").save({'_user_1' : this._user_1, '_user_2':  this._user_2},function(err, spool)){

			}
		}
	})
}



module.exports = mongoose.model('SpoolContacts', spoolContactsShema);