/**
* Created with bitscontrol.
* User: exciter
* Date: 2014-12-30
* Time: 07:58 PM
*/
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;




exports.basic = function(app, express, mongoose) {
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
      User.findOne({ username: username }, function(err, user) {
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
  
  app.configure(function() {
//     app.use(express.logger());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    app.use(express.session({ secret: 'keyboard cat' })); // CHANGE THIS SECRET!
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
    app.use(app.router);
    app.use(express.static('public'));
  });
  
  app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err) }
      if (!user) {
        req.session.messages =  [info.message];
        res.setHeader("Access-Control-Expose-Headers", "Location");
        res.setHeader("Location", "/login");
        res.send(404);
        next();
      }else{
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          res.send(200);
  //         return res.redirect('/');
        });
      }
    })(req, res, next);
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.send(200);
//     res.redirect('/');
  });
  
  return function(req, res, next) {
    console.log(2)
    next();
  }
};