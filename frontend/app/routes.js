// Application routes.
module.exports = function(match) {
  match('register', 'home#register');
  match('login', 'home#login');
  match('logout', 'home#logout');

  match('command/create', 'command#create');
  match('command/delete/:id', 'command#delete');
  match('command/:id', 'command#edit');
  match('command', 'command#index');
  
  match('module/:id', 'module#edit');
  match('module', 'module#index');
  
  return match('', 'home#index');
  
};
