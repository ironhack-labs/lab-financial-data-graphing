
/* GET home page. */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Financial Data' });
});

module.exports = router;
