var express = require('express');
var router = express.Router();
const axios= require('axios');



/* GET home page. */
router.get('/', function(req, res, next) {

  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json`)
  .then((x) => {
     console.log(x)
  })
  res.render('index', { title: 'Express' });
});



module.exports = router;
