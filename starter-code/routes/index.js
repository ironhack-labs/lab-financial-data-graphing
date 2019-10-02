var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Get API

axios
  .get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then(responseFromAPI => console.log("The response from API: ", responseFromAPI))
  .catch(err => console.log("Error while getting the data: ", err));

module.exports = router;
