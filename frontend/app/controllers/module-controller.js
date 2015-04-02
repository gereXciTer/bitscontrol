var Controller = require('controllers/base/controller');
var utils = require('lib/utils');

var ModuleView = require('views/module/module-view');
var ModuleCollectionView = require('views/module/modules-view');
var CommandCollectionView = require('views/command/commands-view');

var ModuleModel = require('models/module');
var ModuleCollection = require('models/module-collection');
var CommandCollection = require('models/command-collection');

module.exports = Controller.extend({
  
  index: function(){
    var self = this;
    var moduleCollection = new ModuleCollection();
    moduleCollection.fetch({
      success: function(collection){
        self.view = new ModuleCollectionView({
          region: 'main',
          collection: collection
        });
      }
    });
  },

  edit: function(params){
    var self = this;
    var moduleModel = new ModuleModel({_id: params.id});
    moduleModel.fetch({
      success: function(model, response, options){
        self.view = new ModuleView({region: 'main', model: model});
        var commandCollection = new CommandCollection();
        commandCollection.fetch({
          data: {module: params.id},
          success: function(collection){
            var commandCollectionView = new CommandCollectionView({
              region: 'commands',
              collection: collection
            });
            self.view.subview('commands', commandCollectionView);
          }
        });
      }
    });

  }

});
