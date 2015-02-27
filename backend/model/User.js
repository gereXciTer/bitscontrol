/**
* Created with bitscontrol.
* User: exciter
* Date: 2014-12-30
* Time: 10:06 PM
*/
var mongoose = require('mongoose');
var bcrypt = require("bcryptjs");
SALT_WORK_FACTOR = 10;

var userSchema = mongoose.Schema({

    local            : {
        username: { type: String, required: true, unique: false },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true}
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});


// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.getProfile = function(){
  var types = ['local', 'facebook', 'twitter', 'google'];
  var profile;
  for(var i = 0; i < types.length; i++){
    if(this[types[i]] && (this[types[i]].name || this[types[i]].username)){
      profile = this[types[i]];
    }
  }
  if(!profile.username){
    profile.username = profile.name;
  }
  return profile;
}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

