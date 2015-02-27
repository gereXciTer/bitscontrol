var Controller = require('controllers/base/controller');
var HeaderView = require('views/home/header-view');
var HomePageView = require('views/home/home-page-view');
var utils = require('lib/utils');

module.exports = Controller.extend({
  beforeAction: function() {
    this.constructor.__super__.beforeAction.apply(this, arguments);
    this.reuse('header', HeaderView, {region: 'header'});
  },

  index: function() {
    this.view = new HomePageView({region: 'main'});
    
    Chaplin.mediator.unsubscribe('pushCommand');
    Chaplin.mediator.subscribe('pushCommand', function(params){
      $.ajax({
        type: 'POST',
        url: utils.getUrlBase() + 'api/command',
        traditional: true,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
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
