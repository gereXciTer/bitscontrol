/**
* Created with bitscontrol.
* User: exciter
* Date: 2014-12-30
* Time: 07:58 PM
*/
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;




exports.basic = function(app, express, mongoose, serverUrl) {
  var User = require('./../model/User').create(mongoose);
  
  passport.serializeUser(function(user, done) {
    done(null, user.email);
  });

  passport.deserializeUser(function(email, done) {
    User.findOne( { email: email } , function (err, user) {
      done(err, user);
    });
  });
  
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(username, password, done) {
      User.findOne({ email: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));
  
  
//     app.use(express.logger());
  var cookieParser = require('cookie-parser');
  app.use(cookieParser());
  var methodOverride = require('method-override');
  app.use(methodOverride());
  var expressSession = require('express-session');
  app.use(expressSession({ secret: 'bits control', resave: false, saveUninitialized: false }));
  // Remember Me middleware
  app.use( function (req, res, next) {
    if ( req.method == 'POST' && req.url == '/login' ) {
      if ( req.body.rememberme ) {
        req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
      } else {
        req.session.cookie.expires = false;
      }
    }
    next();
  });
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static('public'));
  
  app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err) }
      if (!user) {
        req.session.messages =  [info.message];
        res.setHeader("Access-Control-Expose-Headers", "Location");
        res.setHeader("Location", "/login");
        res.status(404).send({errorText:"User not found"});;
        res.end();
      }else{
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          res.send(200);
  //         return res.redirect('/');
        });
      }
    })(req, res, next);
  });

  app.post('/register', function(req, res, next) {
    console.log(1)
    var params = req.body;
    if(params.password.length < 6){
      res.setHeader("Access-Control-Expose-Headers", "Location");
      res.setHeader("Location", "/register");
      res.status(412).send({errorText:"Password too short (at least 6 symbols)"});
      res.end();
    }else if(params.password !== params.password_repeat){
      res.setHeader("Access-Control-Expose-Headers", "Location");
      res.setHeader("Location", "/register");
      res.status(417).send({errorText:"Passwords don't match"});
      res.end();
    }else{
      var save = function(exists){
        if(exists){
          res.status(409).send({errorText:"User already exists"});
        }else{
          var newUser = new User({
            username: params.name,
            email: params.email,
            password: params.password
          });
          newUser.save(function(err) {
            if(err) {
              handleError(req, res, err);
            } else {
              console.log('created with id: ' + newUser._id);
              res.set("Link", "</api/user/" + newUser._id + ">; rel=\"created-resource\"");
              res.status(201).send({
                id: newUser._id
              });
            }
          });
        }
      };

      User.findOne({ email: params.email }, function(err, user) {
        if (err) { return save(false); }
        if (!user) {
          return save(false);
        }
        return save(true);
      });
    }
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.send(200);
//     res.redirect('/');
  });
  
  return function(req, res, next) {
    console.log('auth success')
    next();
  }
};