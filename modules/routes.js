module.exports = function(app){

	var routes = new Array();

	function getRoutes()
	{
		app._router.stack.forEach(function(r){
			if (r.route && r.route.path){
				routes.push(r.route.path)
			}
		});
		console.log(routes);
	};

	return {
		getRoutes : getRoutes
	}
}