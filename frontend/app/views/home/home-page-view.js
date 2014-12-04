var View = require('views/base/view');

module.exports = View.extend({
  autoRender: true,
  className: 'home-page',
  template: require('./templates/home'),
  events: {
    'click .pushcommand': 'pushCommand'
  },
  pushCommand: function(e){
    e.preventDefault();
    Chaplin.mediator.publish('pushCommand', {
      command: $(e.target).siblings('.command').val(),
      module: 'body'
    });
  }
});
