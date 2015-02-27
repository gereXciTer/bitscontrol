var utils = require('./utils');

var register = function(name, fn) {
  return Handlebars.registerHelper(name, fn);
};

register('with', function(context, options) {
  if (!context || Handlebars.Utils.isEmpty(context)) {
    return options.inverse(this);
  } else {
    return options.fn(context);
  }
});

register('without', function(context, options) {
  var inverse = options.inverse;
  options.inverse = options.fn;
  options.fn = inverse;
  return Handlebars.helpers['with'].call(this, context, options);
});

register('url', function(routeName) {
  var params = [].slice.call(arguments, 1);
  var options = params.pop();
  return utils.reverse(routeName, params);
});

register('srvurl', function(routeName) {
  return utils.getUrlBase() + routeName;
});

register('getLoginBtn', function(routeName) {
  var url = 'home#login',
      text = 'Login';
  $.ajax({
    type: 'POST',
    url: utils.getUrlBase() + 'checkauth',
    contentType: "application/json; charset=utf-8",
    success: function(data){
      url = 'home#logout';
      text = 'Logout (' + data.username + ')';
    }
  });
  
  return '<a href="' + utils.reverse(url, []) + '">' + text + '</a>';
});

