const express = require('express');
const router = express.Router();
// const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/home', 
  require('connect-ensure-login').ensureLoggedIn('/'), 
  function(req, res, next) {
    res.render('home', { title: 'Home' })
})

module.exports = router;
