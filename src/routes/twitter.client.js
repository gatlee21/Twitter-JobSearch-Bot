const express = require('express');
const router = express.Router();
const T = require('../helpers/twit.config')

const home_timeline = 'https://api.twitter.com/1.1/statuses/home_timeline.json'

const match_data = []

router.get('/get/home_timeline', function(req, res){

    T.get(home_timeline, { count: 5 }, function(err, data){
        //this isn't a one size fits all solution O(n)
        for(x in data){
            if(data[x].text.includes('hiring')){
                let log_data = {
                    name : data[x].user.name,
                    text : data[x].text
                }
                match_data.push(log_data)
            }
            else if(data[x].text.includes('open position')){
                let log_data = {
                    name : data[x].user.name,
                    text : data[x].text
                }
                match_data.push(log_data)
            }
    
        }
        res.render('home', {
            title : 'home',
            name : req.session.user.username,
            data : match_data
        })
    })
})

// function crawl(err, data){
//     for(x in data){
//         if(data[x].text.includes('hiring')){
//             let log_data = {
//                 name : data[x].user.name,
//                 text : data[x].text
//             }
//             match_data.push(log_data)
//         }

//         // console.log(data[x].user.name)
//         // console.log(data[x].entities.urls) 
//     }
//     console.log('match data:')
//     console.log(match_data)
// }

module.exports = router