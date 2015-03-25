var Controller = require('controllers/base/controller');
var utils = require('lib/utils');

var CommandView = require('views/command/command-view');
var CommandCollectionView = require('views/command/commands-view');

var CommandModel = require('models/command');
var CommandCollection = require('models/command-collection');

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
    var command = new CommandModel({id: params.id});
    command.fetch({
      success: function(model, response, options){
        self.view = new CommandView({region: 'main', model: model});
      }
    });

  }

});
