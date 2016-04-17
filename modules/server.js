var express = require('express'),
    exp = express();

require('express-reverse')(exp);



//var passportjs = require('./passport');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var uid = require('uid-safe');
var session = require('express-session');
var user = require("./tmpmodel")(exp);
var hash = require("./hash")(exp);
var firewall = require("./../middlewars/firewall");
var chat_valid = require("./../views/common_modules/validate.module.js");







module.exports = function(app) {
    'use strict';

    var  _server = null;

    // Create the server then listen on the port and the route
    function create(){
         this._server = http.createServer(exp);
         this.config();
         this.route();
         this.listen();
    };

    // Set the server to listen on the 8080 port if it's in prod or to 3000 if it's in dev environment
    function listen(){
            var port = 8080;
            if (app.mode === 'dev') {
                port = 3000;
            }
            this._server.listen(port);
            console.log("server start with number port "  +  port );
    };
       
        // Configure the app
    function config(){
            // Set the views pathname to the views folder
            exp.set('views', path.join(__dirname, '../views'));
            // Set the view engine to use Twig
            exp.set('view engine', 'twig');

            // middleware that parse cookie header and populate req.cookies
            exp.use(cookieParser("chat_express_"));
            // middleware session 
            exp.use(session({ secret: 'chat_express_S3CRE7', cookie: { maxAge: 60000},  resave: false, saveUninitialized: true}));


            // compression middleware that enable deflate and gzip
            exp.use(compression());
            // Set the directory that will serve the front end files to public
            exp.use(express.static(path.join(__dirname, '../views')));
            // middleware used for going over POST request data, parse it into json on put it on req.body
            exp.use(bodyParser.json());
            exp.use(bodyParser.urlencoded({ extended: false }));
            exp.use(firewall.start);

             // 404 Not Found
             /*exp.use(function(req, res, next){
                  res.status(404).render('404_error_template', {title: "Sorry, page not found"});
                });*/
    };

    function route(){
             exp.get("index", '/', function(req, res, next) {
                // Test if user is always connected in session request
                // try{
                //     var currUser = req.session.user ;
                //     var findUser = user.findOne();
                //     // console.log(currUser.name == findUser.name && currUser.password == findUser.password);
                //     if(currUser.name == findUser.name && currUser.password == findUser.password)
                //     {
                //         res.redirect("dashboard");
                //     }
                // }catch(e){

                // };
                res.render('index');

             });
             exp.post("login", '/login', function(req, res, next){
                
                /**** module chat_valid **********************************/
                if(!(chat_valid.password(req.body.password) && chat_valid.email(req.body.email)))
                    res.redirect('index');

               var currUser = user.findOne();
                if(currUser === null)
                    res.redirect('index');
                req.session.user = currUser ;

                res.redirect("dashboard");
                /**********************************************************/

                /*** module passportjs ************************************/

               /* passport.authenticate('local', 
                    { successRedirect: 'dashboard',
                      failureRedirect: 'index',
                      failureFlash: true 
                    });
*/
                /*********************************************************/

             });
             exp.get("dashboard", '/dashboard', function(req, res, next){
                // console.log(req.session);
                res.render('dashboard', {'user' : req.session.user});
             });
             exp.get("logout", "/logout", function(req, res, next){
                console.log("log out");
                req.session.user = user.getAnonymeUser();
                res.redirect('/');
             });
    };

    return {
        create: create,
        listen: listen,
        route : route,
        config: config    
    }
}
