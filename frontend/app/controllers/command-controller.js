var Controller = require('controllers/base/controller');
var HeaderView = require('views/home/header-view');
var utils = require('lib/utils');

var CommandView = require('views/command/command-view');

CommandModel = require('models/command');

module.exports = Controller.extend({
  beforeAction: function() {
    this.constructor.__super__.beforeAction.apply(this, arguments);
    this.reuse('header', HeaderView, {region: 'header'});
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
