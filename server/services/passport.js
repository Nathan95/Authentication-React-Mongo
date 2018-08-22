const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//npm install --save passport passport-jwt

//Check if user is logged in

//Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//Strategies are part of the passport eco system and are used to authenticate users
//Create JWT strategy
//the payload is the decoded jwt token: its the user id and timestamp
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  //See if the user ID in the payload exists in our databse
  //if it does call done with the other
  //otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if(err) {return done(err, false);}

    if(user) {
      done(null, user);
    } else {
      done(null, false);
    };
  });
});

passport.use(jwtLogin);
//Tell passport to use this strategy
