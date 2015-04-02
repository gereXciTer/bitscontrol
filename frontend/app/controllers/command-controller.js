var Controller = require('controllers/base/controller');
var utils = require('lib/utils');

var CommandView = require('views/command/command-view');
var CommandCollectionView = require('views/command/commands-view');

var CommandModel = require('models/command');
var CommandCollection = require('models/command-collection');
var ModuleCollection = require('models/module-collection');

module.exports = Controller.extend({

  index: function(){
    var self = this;
    var commandCollection = new CommandCollection();
    commandCollection.fetch({
      success: function(collection){
        self.view = new CommandCollectionView({
          region: 'main',
          collection: collection
        });
      }
    });
  },

  edit: function(params){
    var self = this;
    var command = new CommandModel({_id: params.id});
    command.fetch({
      success: function(model, response, options){
        var moduleCollection = new ModuleCollection();
        moduleCollection.fetch({
          success: function(collection){
            model.set('modules', collection.models);
            self.view = new CommandView({region: 'main', model: model});
          }
        });
      }
    });

    Chaplin.mediator.unsubscribe('pushCommand');
    Chaplin.mediator.subscribe('pushCommand', function(params){
      params.model.save(null, {
        success: function(record, response){
          params.output.html(response.message);
        },
        error: function(jqXHR){
          if(jqXHR.getResponseHeader('Location')){
            utils.redirectTo({url: jqXHR.getResponseHeader('Location')});
          }else{
            params.output.html(jqXHR.responseJSON ? jqXHR.responseJSON.errorMessage : 'Unknown error');
          }
        }
      });

    });

  },

  create: function(params){
    var self = this;
    var command = new CommandModel();
    var moduleCollection = new ModuleCollection();
    moduleCollection.fetch({
      success: function(collection){
        command.set('modules', collection.models);
        self.view = new CommandView({region: 'main', model: command});
      }
    });

    Chaplin.mediator.unsubscribe('pushCommand');
    Chaplin.mediator.subscribe('pushCommand', function(params){
      params.model.save(null, {
        success: function(record, response){
          params.output.html('Command created successfully');
        },
        error: function(record, jqXHR){
          if(jqXHR.getResponseHeader && jqXHR.getResponseHeader('Location')){
            utils.redirectTo({url: jqXHR.getResponseHeader('Location')});
          }else{
            params.output.html(jqXHR.responseJSON ? jqXHR.responseJSON.errorMessage : 'Unknown error');
          }
        }
      });
    });

  }



});
