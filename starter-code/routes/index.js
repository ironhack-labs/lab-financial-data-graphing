var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Bitcoin' });
});

router.get('/index1', function(req, res, next){
  res.render('http://api.coindesk.com/v1/bpi/historical/close.json', {title: 'Express'})
}),

module.exports = router;
