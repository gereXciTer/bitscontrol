var View = require('views/base/view');

module.exports = View.extend({
  autoRender: true,
  className: 'home-page',
  template: require('./templates/home'),
  regions: {
    modules: '#modules',
    commands: '#commands'
  },
  events: {
  },
  attach: function(args){
    this.constructor.__super__.attach.apply(this, arguments);
    
  }
});
