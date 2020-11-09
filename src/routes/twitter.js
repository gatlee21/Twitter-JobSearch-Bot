const express = require('express');
const router = express.Router();
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy
const session = require('express-session')

passport.use(new TwitterStrategy({
    consumerKey: '95FP7prmP9wni6AEg9tD9mD81',
    consumerSecret: 'bOZEkFXETmlkuXUyYFY8s3a2AxGVAoHEoBXWRgQrJLHYn1txyg',
    callbackURL: "/twitter/callback"
  },
  function(token, tokenSecret, profile, callback) {
    return callback(null, profile);
   }
));

  passport.serializeUser(function(user, callback) {
    callback(null, user);
  })
  
  passport.deserializeUser(function(obj, callback) {
    callback(null, obj);
  })

router.use(session({
    secret: 'sdjasASDjioasd',
    resave: true,
    saveUninitialized: true
  }))

router.use(passport.initialize())
router.use(passport.session())

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/home',
                                     failureRedirect: '/' }));


module.exports = router