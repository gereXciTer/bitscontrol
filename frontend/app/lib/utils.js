// Application-specific utilities
// ------------------------------

// Delegate to Chaplin’s utils module.
var utils = Chaplin.utils.beget(Chaplin.utils);

_.extend(utils, {
  getUrlBase: function() {
    return '/backend/';
  }
});

// Prevent creating new properties and stuff.
if (typeof Object.seal === 'function') Object.seal(utils);

module.exports = utils;
