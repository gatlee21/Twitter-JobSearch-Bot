const express = require('express');
const router = express.Router();
const T = require('../helpers/twit.config')

router.get('/get/home_timeline', function(req, res){

    T.get('search/tweets', { q: 'Work', count: 100 }, function(err, data, response) {
        console.log(data)
    })
})


module.exports = router