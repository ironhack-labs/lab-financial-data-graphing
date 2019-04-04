var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/finance', (req, res, next) => {
  res.render('finance.hbs');
})

module.exports = router;
