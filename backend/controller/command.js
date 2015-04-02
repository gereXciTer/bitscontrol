/**
* Created with bitscontrol.
* User: exciter
* Date: 2014-12-30
* Time: 07:38 PM
*/

var modules = require('./../modules/main');

exports.init = function(app, vm){
  var Command = require('./../model/Command');

  app.get('/api/command', function (req, res, next) {
    
    if(req.user){
      var criteria = {
        owner: req.user._id
      };
      if(req.query.module){
        criteria['module'] = req.query.module;
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

  app.get('/api/command/:id', function (req, res, next) {
      var criteria = {
        _id: req.params.id,
        owner: req.user._id
      };
      Command.findOne(criteria, function(err, record) {
        if (!err){ 
          if(record){
            res.send(record);
          }else{
            res.location("/command").send(404);
          }
        }
        
      });
    
  });

  app.put('/api/command/:id', function (req, res, next) {
      var criteria = {
        _id: req.params.id,
        owner: req.user._id
      };
      Command.where(criteria).update({
        name: req.body.name,
        module: req.body.module,
        command: req.body.command
      }, function(err, numberAffected){
        if (!err){ 
          if(numberAffected){
            res.status(200).send({status: "success", message: "Command updated successfully"});
          }else{
            res.send(404);
          }
        }
      });
    
  });

  app.post('/api/command', function (req, res) {
    var query = Command.where({
      module: req.body.module,
      name: req.body.name,
      owner: req.user._id
    });
    query.findOne(function(err, record) {
      if(err) {
        handleError(req, res, err);
      } else if(record != null) {
        console.log("Command for module " + record.module + " already exists");
        res.status(409).send({
          errorCode: 409,
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

  app.delete('/api/command/:id', function (req, res, next) {
      var criteria = {
        _id: req.params.id,
        owner: req.user._id
      };
      Command.findOne(criteria).remove(function(err){
        if (!err){ 
          res.status(200).send({status: "success", message: "Command updated successfully"});
        }else{
          res.send(404);
        }
      });
    
  });

  app.post('/api/command/:id', function (req, res) {
    var criteria = {
      _id: req.params.id,
      owner: req.user._id
    };
    Command.findOne(criteria, function(err, record) {
      
      if (!err){ 
        if(record){
          record.getModule(function(err, module){
            if(!err && module.name){
              var context = vm.createContext(modules[module.name]().public());
              vm.runInContext(record.command, context);
              //     console.log(util.inspect(context));
              res.send(JSON.stringify(context));
            }else{
              res.location("/command/" + req.params.id).send(404);
            }
          });
        }else{
          res.location("/command/" + req.params.id).send(404);
        }
      }else{
        res.location("/command/" + req.params.id).send(404);
      }

    });
  });

}