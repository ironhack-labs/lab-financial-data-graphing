var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


http://api.coindesk.com/v1/bpi/historical/close.json

module.exports = router;
