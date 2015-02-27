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
mongoose.connect('mongodb://localhost/bitscontrol');

var vm = require('vm');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var server = app.listen(3332);

var sessionOpts = {
  saveUninitialized: true, // saved new sessions
  resave: false, // do not automatically write to the session store
  secret: 'bits.control',
  cookie : { httpOnly: true } // configure when sessions expires
}  

var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(session(sessionOpts))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser('bitscontrol'))

var pushServePort = 3333;

var webserver = pushserve({port: pushServePort, path: 'frontend/public/', noCors: false}, function() {
  console.log('Launched');
});

function ensureAuthenticated(req, res, next) {
  
  if (req.isAuthenticated()) { return next(); }
  res.setHeader("Access-Control-Expose-Headers", "Location");
  res.setHeader("Location", "/login");
  res.send(404);
}

function handleError(req, res, err) {
  console.log('error: ' + JSON.stringify(err));
  res.status(500).send({
    errorCode: 500,
    errorMessage: "internal server error",
    innerError: err
  });
}

app.get('/', function (req, res) {
  console.log(req.query);
  res.send(200);
})

var auth = require('./backend/helper/auth.js');
app.use(auth.basic(app, express, mongoose));

app.post('/api/*', ensureAuthenticated);

var modules = require('./backend/modules/main');
var commandController = require('./backend/controller/command').init(app, mongoose);

