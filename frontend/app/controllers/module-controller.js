var Controller = require('controllers/base/controller');
var utils = require('lib/utils');

var ModuleView = require('views/module/module-view');
var CommandCollectionView = require('views/command/commands-view');

var ModuleModel = require('models/module');
var CommandCollection = require('models/command-collection');

module.exports = Controller.extend({
  
  index: function(){
    var self = this;
  },

  edit: function(params){
    var self = this;
    var moduleModel = new ModuleModel({id: params.id});
    moduleModel.fetch({
      success: function(model, response, options){
        self.view = new ModuleView({region: 'main', model: model});
        var commandCollection = new CommandCollection();
        commandCollection.fetch({
          data: {module: model.get("name")},
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
