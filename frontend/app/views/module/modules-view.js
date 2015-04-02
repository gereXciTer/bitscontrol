/**
* Created with bitscontrol.
* User: exciter
* Date: 2015-03-06
* Time: 07:54 PM
*/

var View = require('views/base/view');
var CollectionView = require('views/base/collection-view');
var utils = require('lib/utils');

module.exports = CollectionView.extend({
  autoRender: true,
  className: 'modules-list',
  tagName: 'table',
  itemSelector: 'tr',
  itemView: View.extend({
    autoRender: true,
    className: 'modules-item',
    tagName: 'tr',
    template: require('./templates/modules-item'),
  }),
  attach: function(args){
    this.constructor.__super__.attach.apply(this, arguments);
  },
  events: {
    'click .deleteCommand': 'deleteCommand',
  },
  deleteCommand: function(e){
    var self = this;
    e.preventDefault();
    
    if(confirm("are you sure want delete this item?")){
      var record = this.collection.get($(e.target).attr('data-id'));
      if(record){
        record.destroy({
          success: function(){
            self.collection.fetch();
          }
        });
      }
    }

  }
});
