const express = require('express');
const router = express.Router();
// const connect = require('connect-ensure-login')

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
    res.render('home', { title: 'Home' })
})

module.exports = router;
