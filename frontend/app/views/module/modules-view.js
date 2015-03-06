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
  tagName: 'ul',
  itemView: View.extend({
    autoRender: true,
    className: 'modules-item',
    events: {

    },
    template: require('./templates/modules-item'),
  }),
  attach: function(args){
    this.constructor.__super__.attach.apply(this, arguments);
  }
});
