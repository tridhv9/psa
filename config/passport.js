const LocalStrategy = require('passport-local').Strategy;
// Load User model
const User = require('../models/login');

module.exports = function(passport) {
  passport.use({usernameField:"emp_id", passwordField:"password"},
    new LocalStrategy((id, password,done) => {
      console.log(id)
      console.log(password)
      var user=User.login(id,password)
      done(null,user)
    
    })
  );

  passport.serializeUser(function(id, done) {
    done(null, id);
  });

  passport.deserializeUser(async function(id, done) {
      var user =await User.get_user(id)
      done(null,user);
    });

};
