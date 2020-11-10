const express = require('express');
const router = express.Router();
const twitterAuth = require('./twitter')
// const connect = require('connect-ensure-login')

//this router obj needs to be connected to twitterAuth
//in order to share req
router.use(twitterAuth)

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
})

router.get('/home', function(req, res, next) {
    console.log(req.session.user)
    res.render('home', { title: 'Home' })
})

module.exports = router;
