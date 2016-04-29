var    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    fs = require('fs'),
    dateFormat = require('dateformat');

module.exports = function (app) {
	'use strict';
	
	
	var io  = null ;
	
	function create()
	{
	    this.io = require('socket.io').listen(app.server.getServer());
        this.listen();
	}

    function listen()
    {
        this.io.sockets.on('connection', function (socket, pseudo) {
            // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
            socket.on('nouveau_client', function(pseudo) {
                pseudo = ent.encode(pseudo);
                socket.pseudo = pseudo;
                socket.broadcast.emit('nouveau_client', pseudo);
            });
        
            // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
            socket.on('message', function (message) {
                message = ent.encode(message);
                socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
            }); 
        });
    }
	return{
        create : create,
        listen : listen,
	}
}