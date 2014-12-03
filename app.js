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

var modules = {
  body: {
    public: function (){
      var self = this;
      return {
        getModule: function(name){
          return self.getModule(name);
        }
      };
    },
    getModules: function(){
      return {
        engine: {
          on: function(){
            console.log("engine on");
          },
          stop: function(){
            console.log("engine stop");
          }
        }
      }
    },
    registerModule: function(name, params){
      this.modules[name] = params;
    },
    getModule: function(name){
      var modules = this.getModules();
      if(modules[name]){
        return modules[name];
      }
    }
    
  },
};

app.get('/', cors(corsOptions), function (req, res) {
  console.log(req.query);
  res.send('<form action="post" method="POST"><input type="text" name="module"><input type="submit" value="submit"></form>');
})

app.post('/', cors(corsOptions), function (req, res) {
  var currentModule = req.body.module;
  var command = req.body.command;
  
  if(command && currentModule){
    var context = vm.createContext(modules[currentModule].public());
    vm.runInContext(command, context);
  }
})

app.put('/user', cors(corsOptions), function (req, res) {
  res.send('Got a PUT request at /user');
})

app.delete('/user', cors(corsOptions), function (req, res) {
  res.send('Got a DELETE request at /user');
})

