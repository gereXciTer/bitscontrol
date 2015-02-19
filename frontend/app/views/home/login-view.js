/**
* Created with bitscontrol.
* User: exciter
* Date: 2015-01-09
* Time: 08:34 PM
*/

var View = require('views/base/view');
var utils = require('lib/utils');

module.exports = View.extend({
  autoRender: true,
  className: 'login-page',
  template: require('./templates/login'),
  events: {
    'click .loginBtn': 'doLogin'
  },
  attach: function(args){
    this.constructor.__super__.attach.apply(this, arguments);
  },
  doLogin: function(e){
    e.preventDefault();
    var form = $(e.target).parents('form:first');
    
    $.ajax({
      type: 'POST',
      url: utils.getUrlBase() + 'login',
      traditional: true,
      contentType: "application/json; charset=utf-8",
      crossDomain: true,
      data: JSON.stringify(form.serializeObject()),
      success: function(data){
        utils.redirectTo("home#index");
      },
      error: function(jqXHR){
        form.find('.error').html('Login failed');
        if(jqXHR.getResponseHeader('Location')){
          utils.redirectTo({url: jqXHR.getResponseHeader('Location')});
        }
      }
    });
  }
});
