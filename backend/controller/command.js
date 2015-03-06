/**
* Created with bitscontrol.
* User: exciter
* Date: 2014-12-30
* Time: 07:38 PM
*/

exports.init = function(app){
  var Command = require('./../model/Command');

  app.get('(/api)?/command', function (req, res, next) {
    
    if(req.user){
      var criteria = {
        owner: req.user._id
      };
      if(req.body.module){
        criteria['module'] = req.body.module;
      }
      Command.find(criteria, function(err, records) {
        if (!err){ 
          res.send(records);
        }
      });
    }else{
      res.location("/login").send(412);
      res.end();
    }
    
  });

  app.get('(/api)?/command/:id', function (req, res, next) {
      var criteria = {
        _id: req.params.id,
        owner: req.user._id
      };
      Command.find(criteria, function(err, records) {
        if (!err){ 
          res.send(records);
        }
      });
    
  });

  app.post('(/api)?/command', function (req, res) {
    var query = Command.where({
      module: req.body.module,
      owner: req.user._id
    });
    query.findOne(function(err, record) {
      if(err) {
        handleError(req, res, err);
      } else if(record != null) {
        console.log("Command for module " + record.module + " already exists");
        res.status(400).send({
          errorCode: 400,
          errorMessage: "Command for module " + record.module + " already exists"
        });
      } else {
        var newRecord = new Command({
          name: req.body.name,
          module: req.body.module,
          command: req.body.command,
          owner: req.user._id
        });
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

  });

  app.post('(/api)?/command/execute', function (req, res) {
    var currentModule = req.body.module;
    var command = req.body.command;

    if(command && currentModule){
      var context = vm.createContext(modules[currentModule]().public());
      vm.runInContext(command, context);
      //     console.log(util.inspect(context));
      res.send(JSON.stringify(context));
    }
  });

}