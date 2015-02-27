// Application routes.
module.exports = function(match) {
  match('register', 'home#register');
  match('login', 'home#login');
  match('logout', 'home#logout');
  return match('', 'home#index');
  
};
