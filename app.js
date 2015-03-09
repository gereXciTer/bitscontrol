/**
* Created with bitscontrol.
* User: exciter
* Date: 2014-12-01
* Time: 09:56 PM
* To change this template use Tools | Templates.
*/

var util = require('util');
var pushserve = require('pushserve');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var vm = require('vm');
var passport = require('passport');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

mongoose.connect('mongodb://localhost/bitscontrol');

require('./backend/config/passport')(passport);

app.use(cookieParser('bitscontrol'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// required for passport
var sessionOpts = {
  saveUninitialized: true, // saved new sessions
  resave: false, // do not automatically write to the session store
  secret: 'bits.control',
  cookie : { httpOnly: true } // configure when sessions expires
}  
app.use(session(sessionOpts))
app.use(passport.initialize());
app.use(passport.session());

// routes ======================================================================
require('./backend/routes')(app, passport); // load our routes and pass in our app and fully configured passport


var server = app.listen(3332);

var pushServePort = 3333;

var webserver = pushserve({port: pushServePort, path: 'frontend/public/', noCors: false}, function() {
  console.log('Launched');
});

function handleError(req, res, err) {
  console.log('error: ' + JSON.stringify(err));
  res.status(500).send({
    errorCode: 500,
    errorMessage: "internal server error",
    innerError: err
  });
}

var commandController = require('./backend/controller/command').init(app, mongoose);
var moduleController = require('./backend/controller/module').init(app, mongoose);

