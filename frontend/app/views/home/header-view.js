var View = require('views/base/view');
var utils = require('lib/utils');

module.exports = View.extend({
  autoRender: true,
  className: 'header',
  tagName: 'header',
  template: require('./templates/header'),
  attach: function(args){
    var loginBtn = this.$el.find('.loginBtn');
    var updateBtn = function(callback){
      $('.auth-required').addClass('hidden');
      loginBtn.html('Login');
      loginBtn.attr('href', utils.reverse('home#login', []));
      if(loginBtn){
        $.ajax({
          type: 'POST',
          url: utils.getUrlBase() + 'checkauth',
          contentType: "application/json; charset=utf-8",
          success: function(data){
            if(data.username){
              $('.auth-required').removeClass('hidden');
              loginBtn.html('Logout (' + data.username + ')');
              loginBtn.attr('href', utils.reverse('home#logout', []));
            }
            if(callback){
              callback(true);
            }
          },
          error: function(){
            $('.auth-required').addClass('hidden');
            if(callback){
              callback(false);
            }
          }
        });
      }
    };
    updateBtn();
    Chaplin.mediator.unsubscribe('auth:update');
    Chaplin.mediator.subscribe('auth:update', updateBtn);
    this.constructor.__super__.attach.apply(this, arguments);
  },
});
