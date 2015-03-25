var Controller = require('controllers/base/controller');
var HomePageView = require('views/home/home-page-view');
var utils = require('lib/utils');

var ModuleCollectionView = require('views/module/modules-view');
var CommandCollectionView = require('views/command/commands-view');

var ModuleCollection = require('models/module-collection');
var CommandCollection = require('models/command-collection');

module.exports = Controller.extend({
  
  index: function(){
    var self = this;
    this.view = new HomePageView({region: 'main'});
    var moduleCollection = new ModuleCollection();
    moduleCollection.fetch({
      success: function(collection){
        var moduleCollectionView = new ModuleCollectionView({
          region: 'modules',
          collection: collection
        });
        self.view.subview('modules', moduleCollectionView);
      }
    });
    var commandCollection = new CommandCollection();
    commandCollection.fetch({
      success: function(collection){
        var commandCollectionView = new CommandCollectionView({
          region: 'commands',
          collection: collection
        });
        self.view.subview('commands', commandCollectionView);
      }
    });

  },

  command: function() {
    this.view = new HomePageView({region: 'main'});
    
//     Chaplin.mediator.publish('auth:update', function(status){
//       if(!status){
//         utils.redirectTo('home#login');
//       }
//     });
    

  },
  
  login: function(){
    var LoginView = require('views/home/login-view');
    this.view = new LoginView({region: 'main'});
  },
  
  logout: function(){
    $.ajax({
      type: 'POST',
      url: utils.getUrlBase() + 'logout',
      traditional: true,
      contentType: "application/json; charset=utf-8",
      success: function(data){
        Chaplin.mediator.publish('auth:update');
        utils.redirectTo('home#index');
      },
      error: function(jqXHR){
        if(jqXHR.getResponseHeader('Location')){
          utils.redirectTo({url: jqXHR.getResponseHeader('Location')});
        }
        console.log('logout error');
      }
    });
  },

  register: function(){
    var RegisterView = require('views/home/register-view');
    this.view = new RegisterView({region: 'main'});
  }

});
