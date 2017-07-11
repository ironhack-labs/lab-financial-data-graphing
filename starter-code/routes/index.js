var express = require('express');
var router = express.Router();



/* GET home page. */
const baseURL = `http://api.coindesk.com/v1/bpi/historical/close.json`;
router.get('/', function(req, res, next) {
  $.ajax({url:baseURL, dataType:'json'}).then(data => console.log(data))
  res.render('index', { title: 'Express' });
});



module.exports = router;
