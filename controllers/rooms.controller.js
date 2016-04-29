

/**** MODELS ***************************************/

/**************************************************/


module.exports = function(app){

	function room(req, res , next)
	{
		res.render('room');
	}
	function room2(req, res, next)
	{
		res.render('room');
	}
	return {
		room : room,
		room2  : room2
	}
}