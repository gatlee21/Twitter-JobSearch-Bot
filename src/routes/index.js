const express = require('express');
const router = express.Router();
const twitterAuth = require('./twitter.auth')
const twitterClient = require('./twitter.client')


//this router obj needs to be connected to twitterAuth
//in order to share req
router.use(twitterAuth)
router.use(twitterClient)

/* GET login page. */
router.get('/', isLoggedIn ,function(req, res, next) {
  res.render('home', { title: 'home', name : req.session.user.username });
})

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'login' })
})


function isLoggedIn(req, res, next) {
  if (req.session.user !== undefined) {
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
