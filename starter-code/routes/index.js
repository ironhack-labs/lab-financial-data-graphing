var express = require('express');
var router = express.Router();
// var api = require('')
/* GET home page. */
router.get('/', function(req, res, next) {

  //axios.get('http://api.coindesk.com/v1/bpi/historical/close.json', data)
  res.render('index', { title: 'Express' });
});

module.exports = router;
