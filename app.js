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
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bitscontrol');

var vm = require('vm');

app.use(bodyParser.json());

var server = app.listen(3332);

var whitelist = [
  'http://' + server.address().address + ':' + server.address().port,
  'http://joel-radius.codio.io:3333'
];
var corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};

var webserver = pushserve({port: 3333, path: 'frontend/public/', noCors: false}, function() {
  console.log('Launched');
});

app.options('*', cors(corsOptions));

var modules = require('./backend/modules/main.js');

app.get('/', cors(corsOptions), function (req, res) {
  console.log(req.query);
  res.send(200);
})

var Command = require('./backend/model/Command.js').create(mongoose);
app.post('(/api)?/command', cors(corsOptions), function (req, res) {
  var currentModule = req.body.module;
  var command = req.body.command;
  var newRecord = new Command({
    module: req.body.module,
    command: req.body.command
  });
  var query = Command.where({
    module: newRecord.module
  });
  query.findOne(function(err, record) {
    if(err) {
      handleError(req, res, err);
    } else if(record != null) {
      console.log("record " + record.module + " already exists");
      res.status(400).send({
        errorCode: 400,
        errorMessage: "record " + record.module + " already exists"
      });
    } else {
      newRecord.save(function(err) {
        if(err) {
          handleError(req, res, err);
        } else {
          console.log('created with id: ' + newRecord._id);
          res.set("Link", "</api/command/" + newRecord._id + ">; rel=\"created-resource\"");
          res.status(201).send({
            id: newRecord._id
          });
        }
      });
    }
  });
  
})

app.post('/execute', cors(corsOptions), function (req, res) {
  var currentModule = req.body.module;
  var command = req.body.command;
  
  if(command && currentModule){
    var context = vm.createContext(modules[currentModule]().public());
    vm.runInContext(command, context);
//     console.log(util.inspect(context));
    res.send(JSON.stringify(context));
  }
})

app.put('/user', cors(corsOptions), function (req, res) {
  res.send('Got a PUT request at /user');
})

app.delete('/user', cors(corsOptions), function (req, res) {
  res.send('Got a DELETE request at /user');
})

function handleError(req, res, err) {
  console.log('error: ' + JSON.stringify(err));
  res.status(500).send({
    errorCode: 500,
    errorMessage: "internal server error",
    innerError: err
  });
}