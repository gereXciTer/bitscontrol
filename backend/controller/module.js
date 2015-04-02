/**
* Created with bitscontrol.
* User: exciter
* Date: 2015-02-27
* Time: 07:22 PM
*/
var modules = require('./../modules/main');

exports.init = function(app, vm){
  var Module = require('./../model/Module');

  app.get('(/api)?/module', function (req, res) {
    if(req.user){
      var createstaticlist = function(moduleName){
        Module.find({name: moduleName, static: true}, function(err, records) {
          if (!err){ 
            if(!records.length){
              var newRecord = new Module({
                name: moduleName,
                public: true,
                active: true,
                static: true
              });
              newRecord.save(function(err) {
                if(err) {
                  handleError(req, res, err);
                } else {
                  console.log(moduleName);
                }
              });
            }
          }
        });
      };
      //for(var moduleName in modules){
      //  createstaticlist(moduleName);
      //}
      Module.find({$or:[ {'owner': req.user._id}, {'static':true} ]}, function(err, records) {
        if (!err){ 
          res.send(records);
        }
      });
    }else{
      res.location("/login").send(412);
      res.end();
    }
  });
  
    app.get('/api/module/:id', function (req, res, next) {
      var criteria = {
        _id: req.params.id
      };
      Module.findOne(criteria, function(err, record) {
        if (!err){
          if(record){
            if(!record.public && owner !== req.user._id){
              res.location("/module").send(403);
            }else{
              res.send(record);
            }
          }else{
            res.location("/module").send(404);
          }
        }
        
      });
    
  });

  app.post('(/api)?/module', function (req, res) {
    var query = Module.where({
      owner: req.user._id
    });
    query.findOne(function(err, record) {
      if(err) {
        handleError(req, res, err);
      } else if(record != null) {
        console.log("Module " + record._id + " already exists");
        res.status(400).send({
          errorCode: 400,
          errorMessage: "Module " + record._id + " already exists"
        });
      } else {
        var newRecord = new Module({
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

}