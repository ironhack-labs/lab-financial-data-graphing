const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
.then( res => {
  //console.log(res.data.bpi);
  return {
    start_date: res.data.bpi  
  }
})


module.exports = router;
