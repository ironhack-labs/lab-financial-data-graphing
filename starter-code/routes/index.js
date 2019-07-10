var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */

router.get('/', function(req, res, next) {
  axios.get('https://api.coindesk.com/v1/bpi/supported-currencies.json')
  .then(response => {
    const {data} = response;
    res.render('index', {data});
  })
  .catch(err => console.log(err));
  
});


module.exports = router;
