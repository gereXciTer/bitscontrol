/**
* Created with bitscontrol.
* User: exciter
* Date: 2015-03-25
* Time: 07:37 PM
*/
var View = require('views/base/view');
var utils = require('lib/utils');

module.exports = View.extend({
  autoRender: true,
  className: 'module-page',
  template: require('./templates/module'),
  regions: {
    commands: "#commands"
  },
  attach: function(args){
    this.constructor.__super__.attach.apply(this, arguments);
  }
});
