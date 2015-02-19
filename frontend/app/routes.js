// Application routes.
module.exports = function(match) {
  match('register', 'home#register');
  match('login', 'home#login');
  return match('', 'home#index');
  
};
