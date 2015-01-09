/**
* Created with bitscontrol.
* User: exciter
* Date: 2014-12-30
* Time: 07:38 PM
*/

exports.init = function(app, mongoose){
  var Command = require('./../model/Command').create(mongoose);
  app.post('(/api)?/command', function (req, res) {
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