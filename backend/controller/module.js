/**
* Created with bitscontrol.
* User: exciter
* Date: 2015-02-27
* Time: 07:22 PM
*/

exports.init = function(app){
  var Module = require('./../model/Module');

  app.get('(/api)?/module', function (req, res) {
    //     var query = Module.where({
    //       owner: req.user._id
    //     });
    Module.find({owner: req.user._id}, function(err, records) {
      if (!err){ 
        console.log(records);
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