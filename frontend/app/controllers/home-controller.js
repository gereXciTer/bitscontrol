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
    
    Chaplin.mediator.subscribe('pushCommand', function(params){
      $.ajax({
        type: 'POST',
        url: utils.getUrlBase() + 'api/command',
        traditional: true,
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        data: JSON.stringify({
          module: params.module,
          command: params.command
        }),
        success: function(data){
          params.output.html('<div data-alert class="alert-box"><a href="#" class="close">&times;</a></div>');
        },
        error: function(jqXHR){
          if(jqXHR.getResponseHeader('Location')){
            utils.redirectTo('home#login');
          }else{
            params.output.html(jqXHR.responseJSON ? error.responseJSON.errorMessage : 'Unknown error');
          }
        }
      });
    });
  },
  
  login: function(){
    var LoginView = require('views/home/login-view');
    this.view = new LoginView({region: 'main'});
  }
});
