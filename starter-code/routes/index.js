const express = require('express');
const  router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title:"Graficas de bitcoin"}); 
});

router.get('/datos',(req,res,next) => {
  let bitcoindata = axios.create({
    baseURL: 'https://api.coindesk.com/v1/bpi/historical/close.json'
  });
  bitcoindata.get()
  .then((response) => {
    res.json(response.data.bpi);
  })
  .catch((err) => {
    console.log(err);
  })
});


module.exports = router;
