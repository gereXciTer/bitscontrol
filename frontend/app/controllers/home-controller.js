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
    $.ajax({
//       type: 'POST',
//       url: utils.getUrlBase() + '',
//       data: JSON.stringify({
//         module: 'engine',
//         command: 'module.on()'
//       }),
//       contentType: "application/json; charset=utf-8",
      type: 'POST',
      url: utils.getUrlBase() + '',
      traditional: true,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({
        module: 'body',
        command: 'getModule("engine").on();'
      }),
      success: function(){
        
        
        
      }
    });
  }
});
