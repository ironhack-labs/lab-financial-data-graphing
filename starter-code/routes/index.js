var express = require('express');
var router = express.Router();
var financialData = require ("../public/javascripts/financialData")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', financialData);
});

module.exports = router;
