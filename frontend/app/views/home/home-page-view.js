var View = require('views/base/view');
require('lib/ace-min/ace');
require('lib/ace-min/ext-language_tools');
require('lib/ace-min/mode-javascript');

module.exports = View.extend({
  autoRender: true,
  className: 'home-page',
  template: require('./templates/home'),
  events: {
    'click .pushcommand': 'pushCommand'
  },
  attach: function(args){
    this.constructor.__super__.attach.apply(this, arguments);
    
    ace.config.set("basePath", "/ace-min");
    
    this.editor = ace.edit("editor");
    this.editor.session.setMode("ace/mode/javascript");
    this.editor.setTheme("ace/theme/xcode");
    this.editor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true
    });
  },
  pushCommand: function(e){
    e.preventDefault();
    Chaplin.mediator.publish('pushCommand', {
      command: this.editor.session.getValue(),
      module: 'body'
    });
  }
});
