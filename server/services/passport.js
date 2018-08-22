const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local')

//npm install --save passport-local

//Create Local strategy
//this field tells the auth that when looking for the username field, look for email
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
  //Verify this user name and password call done(param) with the user
  //if it is the correct username and password.
  //Otherwise, call done(param) with false
  User.findOne({email: email}, function(err, user){
    if(err) { return done(err); }
    if(!user) { return done(null, false); }

    //compare password - is `password` equal to user.password
    //decode and decrypt hashed password and then compare
    user.comparePassword(password, function(err, isMatch){
      if(err) {return done(err); }

      if(!isMatch){ return done(null, false); }

      return done(null, user);
    });
  });
});

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

//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin)
