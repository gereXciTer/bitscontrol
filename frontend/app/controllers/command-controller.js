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

    Chaplin.mediator.unsubscribe('pushCommand');
    Chaplin.mediator.subscribe('pushCommand', function(params){
      params.model.save({
        success: function(data){
          params.output.html('<div data-alert class="alert-box"><a href="#" class="close">&times;</a></div>');
        },
        error: function(jqXHR){
          if(jqXHR.getResponseHeader('Location')){
            utils.redirectTo({url: jqXHR.getResponseHeader('Location')});
          }else{
            params.output.html(jqXHR.responseJSON ? jqXHR.responseJSON.errorMessage : 'Unknown error');
          }
        }
      });
//       $.ajax({
//         type: 'POST',
//         url: utils.getUrlBase() + 'api/command',
//         traditional: true,
//         contentType: "application/json; charset=utf-8",
//         data: JSON.stringify({
//           name: params.name,
//           module: params.module,
//           command: params.command
//         }),
//         success: function(data){
//           params.output.html('<div data-alert class="alert-box"><a href="#" class="close">&times;</a></div>');
//         },
//         error: function(jqXHR){
//           if(jqXHR.getResponseHeader('Location')){
//             utils.redirectTo({url: jqXHR.getResponseHeader('Location')});
//           }else{
//             params.output.html(jqXHR.responseJSON ? jqXHR.responseJSON.errorMessage : 'Unknown error');
//           }
//         }
//       });
    });

  },

  create: function(params){
    var self = this;
    var command = new CommandModel();
    command.fetch({
      success: function(model, response, options){
        self.view = new CommandView({region: 'main', model: model});
      }
    });

    Chaplin.mediator.unsubscribe('pushCommand');
    Chaplin.mediator.subscribe('pushCommand', function(params){
      $.ajax({
        type: 'POST',
        url: utils.getUrlBase() + 'api/command',
        traditional: true,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
          name: params.name,
          module: params.module,
          command: params.command
        }),
        success: function(data){
          params.output.html('<div data-alert class="alert-box"><a href="#" class="close">&times;</a></div>');
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

  }


});
