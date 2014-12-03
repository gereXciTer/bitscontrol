// Application-specific utilities
// ------------------------------

// Delegate to Chaplin’s utils module.
var utils = Chaplin.utils.beget(Chaplin.utils);

_.extend(utils, {
  getUrlBase: function() {
    return window.location.protocol + '//' + window.location.hostname + ':3332/';
  }
});

// Prevent creating new properties and stuff.
if (typeof Object.seal === 'function') Object.seal(utils);

module.exports = utils;
