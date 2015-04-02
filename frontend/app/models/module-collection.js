/**
* Created with bitscontrol.
* User: exciter
* Date: 2015-02-27
* Time: 07:34 PM
*/
var Collection  = require('models/base/collection');
var utils = require('lib/utils');

module.exports = Collection.extend({
	defaults: {},
  model: require('./module'),
  initialize: function(options) {
    options || (options = {});
    this.options = options;
  },
  url: function(){
    var rootUrl = utils.getUrlBase() + 'api/module/';
//     var query = '?query=' + JSON.stringify(this.options);
    var url = rootUrl;
    return url;
  }
});