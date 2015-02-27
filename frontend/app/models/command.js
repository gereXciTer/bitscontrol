/**
* Created with bitscontrol.
* User: exciter
* Date: 2015-02-27
* Time: 07:30 PM
*/

var Model = require('models/base/model');
var utils = require('lib/utils');

module.exports = Model.extend({
	defaults: {},
	urlRoot: utils.getUrlBase() + 'api/command/'
});