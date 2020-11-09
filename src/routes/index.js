const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/loggedin', function(req, res, next) {
  res.render('loggedin', { title: 'Logged in' });
});

module.exports = router;
