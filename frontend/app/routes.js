// Application routes.
module.exports = function(match) {
  match('register', 'home#register');
  match('login', 'home#login');
  match('logout', 'home#logout');

  match('command/:id', 'command#edit');
  
  return match('', 'home#index');
  
};
