var express = require('express'),
    exp = express();

require('express-reverse')(exp);
var routes = require("./routes.js")(exp);



var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var uid = require('uid-safe');
var session = require('express-session');
var flash    = require('connect-flash');
var user_anonyme = require("./../models/anonyme_user")(exp);
var hash = require("./hash")(exp);
var cookie = require("./../middlewars/cookie");
var firewall = require("./../middlewars/firewall");
var validate = require("./../middlewars/validate");
var chat_valid = require("./../views/common_modules/validate.module.js");
var async = require('async');


var passport = require('passport');
require('./passport')(passport);

/*** CONTROLLERS ***********************************/

var pageController = require("./../controllers/pages.controller")(exp);
var usersController  = require("./../controllers/users.controller")(exp);
var roomsController  = require("./../controllers/rooms.controller")(exp);


/*****************************************************/

/**** MODELS ***************************************/
var User            = require('./../models/user');
var Contact            = require('./../models/contact');
var spoolContactsShema  = require('./../models/spool_contact');
var module_user_anonyme = require("./../models/anonyme_user")();

/**************************************************/

var fs = require('fs');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../views/uploads/'+ req.user.local.name + "/" ) ;
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname ) ;
  }
});

var upload = multer({ storage: storage });



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
    
    function getServer()
    {
        return this._server ; 
    }
       
        // Configure the app
    function config(){
            // Set the views pathname to the views folder
            exp.set('views', path.join(__dirname, '../views'));
            // Set the view engine to use Twig
            exp.set('view engine', 'twig');

            // middleware that parse cookie header and populate req.cookies
            exp.use(cookieParser());
            // middleware session 
             exp.use(session({ secret: 'chat_express_S3CRE7', cookie: { maxAge: 3600000}, resave: false, saveUninitialized: true}));


            // compression middleware that enable deflate and gzip
            exp.use(compression());
            // Set the directory that will serve the front end files to public
            exp.use(express.static(path.join(__dirname, '../views')));
            // middleware used for going over POST request data, parse it into json on put it on req.body
            exp.use(bodyParser.json());
            exp.use(bodyParser.urlencoded({ extended: false }));

            // user passport
            exp.use(passport.initialize());
            exp.use(passport.session());
            // flash message
            exp.use(flash()); 
            // cookie
         //   exp.use(cookie.start);
            // firewall 
            exp.use(firewall.start);
            // validate middlewar
            exp.use(validate.start);

             // 404 Not Found
             /*exp.use(function(req, res, next){
                  res.status(404).render('404_error_template', {title: "Sorry, page not found"});
                });*/
    };

    function route(){
             exp.get("index", '/',pageController.index);
            exp.post("login", '/login', passport.authenticate('local-login', {
                  successRedirect : '/', // redirect to the secure profile section
                  failureRedirect : '/', // redirect back to the signup page if there is an error
                  failureFlash : true // allow flash messages
             }));
             /*exp.post("login", '/login', function(req, res, next) {
              passport.authenticate('local-login', function(err, user, info) {
                if (err) { return next(err); }
                if (!user) { return res.redirect('/'); }
                req.logIn(user, function(err) {
                  if (err) { return next(err); }
                  if(req.body.remember !== undefined)
                  {
                    res.cookie('user', user,  { maxAge: 2592000000 });  // Expires in one month
                  }
                  return res.redirect('/');
                });
              })(req, res, next);
            });*/

             /***** DASHBOARD ****************************************************/
             exp.get("dashboard", '/dashboard', pageController.dashboard);

             exp.post("logout", "/logout", function(req, res, next){
                req.logout();
                res.clearCookie("user");
                res.redirect('/');
             });
              // process the signup form
              exp.post("signup", '/signup', passport.authenticate('local-signup', {
                  successRedirect : '/', // redirect to the secure profile section
                  failureRedirect : '/', // redirect back to the signup page if there is an error
                  failureFlash : true // allow flash messages
              }));

              exp.get("my-account","/my-account",function(req, res, next){
                res.render("my-account");
              });
              /**** GET REQUEST  OF CURRENT USER *****************************/
              exp.get("/my-account/requests/", usersController.getMyRequest);
              /**** DELETE REQUEST OF CURRENT USER  **************************/
              exp.delete("/my-account/requests/:id",usersController.deleteMyRequest);

              exp.get("speudo","/speudo/:name",usersController.getSpeudo);

              /*** GET USER when user.local.name  like :name  **********************/
              exp.get("users","/users/:name",  usersController.getSpeudoLike);

              /**** ADD CONTACT ********************************/
              exp.post("add-user","/contact/add/", usersController.addContact);

              /**** GET REQUEST CONTACT *************************/
              exp.get("get-request-contact","/contact/request/", usersController.getRequestContactAjax);
              /*** ACCEPT REQUEST CONTACT **********************************/
              exp.post("get-request-contact-accept","/contact/request/accept/:id", usersController.acceptRequest);
              /**** REFUSE REQUEST CONTACT ************************************/
              exp.delete("get-request-contact-refuse","/contact/request/refuse/:id", usersController.refuseRequest);
               /**** GET CONTACT **************************************************/
              exp.get("/contacts/", usersController.getContactsAjax);
              /**** DELETE CONTACT *************************************************/
              exp.delete("/contact/:id", usersController.deleteContact);
              
              
              exp.post("/room/create-private-room/:id", roomsController.createPrivateRoom);
             
              
              exp.get("/room/123456", roomsController.room );
              exp.get("/room/789", roomsController.room2 );

    };
    return {
        create: create,
        listen: listen,
        route : route,
        config: config,
        getServer : getServer
    }
}