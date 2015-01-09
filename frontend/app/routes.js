// Application routes.
module.exports = function(match) {
  match('login', 'home#login');
  return match('', 'home#index');
  
};
