var View = require('views/base/view');

module.exports = View.extend({
  container: 'body',
  id: 'site-container',
  regions: {
    header: '#header-container',
    main: '#page-container'
  },
  template: require('./templates/site'),
  attach: function(args){
    this.constructor.__super__.attach.apply(this, arguments);
  }
});
