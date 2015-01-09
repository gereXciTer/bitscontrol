/**
* Created with bitscontrol.
* User: exciter
* Date: 2015-01-09
* Time: 08:34 PM
*/

var View = require('views/base/view');

module.exports = View.extend({
  autoRender: true,
  className: 'login-page',
  template: require('./templates/login'),
  events: {
  },
  attach: function(args){
    this.constructor.__super__.attach.apply(this, arguments);
  }
});
