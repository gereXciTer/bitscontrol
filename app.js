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
var cors = require('cors');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bitscontrol');

var vm = require('vm');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var server = app.listen(3332);

var serverUrl = (server.address().address == '0.0.0.0') ? 'http://joel-radius.codio.io:3333' : server.address().address + ':' + server.address().port;
var whitelist = [
  serverUrl
];
var corsOptions = {
//   exposedHeaders: 'Location',
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};

var pushServePort = 3333;

var webserver = pushserve({port: pushServePort, path: 'frontend/public/', noCors: false}, function() {
  console.log('Launched');
});

// app.post('/login', cors(corsOptions));
// app.post('/register', cors(corsOptions));

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
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", serverUrl);
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.post('/api/*', ensureAuthenticated);
app.post('(/api)?/*', cors(corsOptions));
app.options('*', cors(corsOptions));

var auth = require('./backend/helper/auth.js');
app.use(auth.basic(app, express, mongoose, serverUrl));
var modules = require('./backend/modules/main');
var commandController = require('./backend/controller/command').init(app, mongoose);

