var SiteView = require('views/site-view');
var HeaderView = require('views/home/header-view');

module.exports = Chaplin.Controller.extend({
  // Compositions persist stuff between controllers.
  // You may also persist models etc.
  beforeAction: function() {
    this.reuse('site', SiteView);
    this.reuse('header', HeaderView, {region: 'header'});
  }
});
