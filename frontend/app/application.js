var utils = require('lib/utils');
// The application object.
module.exports = Application = Chaplin.Application.extend({
  start: function() {
    $(document).ajaxError(function (e, xhr, options) {
        if(xhr.getResponseHeader('Location')){
          utils.redirectTo({url: xhr.getResponseHeader('Location')});
        }
    });
    this.constructor.__super__.start.call(this);
  }
})
