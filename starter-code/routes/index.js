var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'THE DEFINITIVE BTN CURRENCY CHART' });
});

module.exports = router;
