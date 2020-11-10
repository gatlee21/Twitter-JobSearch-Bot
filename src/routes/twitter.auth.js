const express = require('express');
const router = express.Router();
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy
const session = require('express-session');
const T = require('../helpers/twit.config');


passport.use(new TwitterStrategy({
    consumerKey: '95FP7prmP9wni6AEg9tD9mD81',
    consumerSecret: 'bOZEkFXETmlkuXUyYFY8s3a2AxGVAoHEoBXWRgQrJLHYn1txyg',
    callbackURL: "/twitter/callback"
  },
  function(token, tokenSecret, profile, callback) {

    //assign tokens to twit
    T.config.access_token = token
    T.config.access_token_secret = tokenSecret

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

router.get('/login/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback',
  passport.authenticate('twitter', 
    { 
      failureRedirect: '/login' 
    }),
    function(req, res){
      req.session.user = req.user
      res.redirect('/')
    }
  
  );

 

module.exports = router