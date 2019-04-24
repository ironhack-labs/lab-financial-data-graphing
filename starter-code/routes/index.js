var express = require('express');
var router = express.Router();
const axios = require("axios")

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  axios.get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then(res => console.log(res))
  .catch(err =>
    console.log(err))
})


module.exports = router;
