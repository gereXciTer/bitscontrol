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
        url: utils.getUrlBase() + 'api/module',
        traditional: true,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
          module: params.module,
          command: params.command
        }),
        success: function(data){
//           console.log(data)
          params.output.html(data)
        }
      });
    });
  }
});
