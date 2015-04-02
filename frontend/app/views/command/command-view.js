/**
* Created with bitscontrol.
* User: exciter
* Date: 2015-03-06
* Time: 08:17 PM
*/

var View = require('views/base/view');
require('lib/ace-min/ace');
require('lib/ace-min/ext-language_tools');
require('lib/ace-min/mode-javascript');

module.exports = View.extend({
  autoRender: true,
  className: 'home-page',
  template: require('./templates/command'),
  events: {
    'click .pushcommand': 'pushCommand',
    'click .keystokeshelp': function(e){
      e.preventDefault();
      $('#keystokes-help').find('.content').height(Math.round($(window).height()*0.75));
      $('#keystokes-help').foundation('reveal', 'open');
    }
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
    
    this.model.set({
      name: this.$el.find('input[name="name"]').val(),
      module: this.$el.find('select[name="module"]').val(),
      command: this.editor.session.getValue()
    });
    Chaplin.mediator.publish('pushCommand', {
      model: this.model,
      output: $(e.target).parents('.row').find('.output')
    });
  }
});
