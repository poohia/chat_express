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
var firewall = require("./../middlewars/firewall");
var validate = require("./../middlewars/validate");
var chat_valid = require("./../views/common_modules/validate.module.js");
var async = require('async');


var passport = require('passport');
require('./passport')(passport);

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

            // user passport
            exp.use(passport.initialize());
            exp.use(passport.session());
            // flash message
            exp.use(flash()); 
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
             exp.get("index", '/', function(req, res, next) {
                res.render('index',{'flashMessage' : req.flash("message")});
             });
             exp.post("login", '/login', passport.authenticate('local-login', {
                  successRedirect : '/', // redirect to the secure profile section
                  failureRedirect : '/', // redirect back to the signup page if there is an error
                  failureFlash : true // allow flash messages
             }));

             /***** DASHBOARD ****************************************************/
             exp.get("dashboard", '/dashboard', function(req, res, next){
                  res.render('dashboard', {'user' : req.user.local});
                  /*var spoolContacts ="test";
                  var spool = new spoolContactsShema({_id : req.user._id});
                  spool.getContactsOfSpool(function(){
                    console.log("i'm here!");

                  });*/
                  
             /*async.parallel([
                    function(callback){
                        spool.getContactsOfSpool(function(users){
                          spoolContacts = users;
                          callback();
                        });
                    },
                    function(callback){
                      callback();
                    }
                  ], function(){
                     res.render('dashboard', {'user' : req.user.local, 'spoolContacts' : spoolContacts });
                    //res.end("ok!");
                    next();
                });
                //res.render('dashboard', {'user' : req.user.local, 'spoolContacts' : spoolContacts });*/
             });

             exp.post("logout", "/logout", function(req, res, next){
                req.logout();
                req.user = module_user_anonyme.getAnonymeUser() ;
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

              exp.get("speudo","/speudo/:name",function(req, res, next){
                res.contentType("json");
                User.findOne({ 'local.name' :  req.params.name }, function(err, user) {
                  if (err)
                    res.status(500);
                  if(user)
                  {
                     
                    res.send( JSON.stringify({speudo: true}));
                  }
                  else
                  {
                    res.send( JSON.stringify({speudo: false}));
                  }
                })
              });

              /*** GET USER when user.local.name  like :name  **********************/
              exp.get("users","/users/:name", function(req, res, next){
                  res.contentType("json");
                  User.find({ 'local.name' : new RegExp(req.params.name, "i")},'local.name local.avatar',function(err, users){
                    if (err)
                       res.status(500);
                    res.send( JSON.stringify({users: users}));
                  });
              });

              /**** ADD USER ********************************/
              exp.post("add-user","/user/add/", function(req, res, next){
                  var tmpSpool = new spoolContactsShema({_user_1 : req.user._id, _user_2 : req.body.id_user});
                  tmpSpool.saveNoRepeat(function(err, spool_saved){
                  //console.log(err);
                  res.contentType("json");
                    if(err)
                      res.status(500);
                    res.send(JSON.stringify({"work": "finished"}));
                  });
                }
              );

              /**** GET REQUEST CONTACT *************************/
              exp.get("get-request-contact","/user/request/", function(req, res, next){
                res.contentType("json");
                var spool = new spoolContactsShema({_id : req.user._id});
                  spool.getContactsOfSpool(function(contacts){
                    res.send(contacts);
                  });
              });
    };
    return {
        create: create,
        listen: listen,
        route : route,
        config: config    
    }
}