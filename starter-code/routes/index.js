var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('http://api.coindesk.com/v1/bpi/historical/close.json', function(req, res, next) {
  res.json(data);
  console.log(data)
});


router.get('/getFinancialData', function(req, res, next) {
  // axios
  //     .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  //     .then(data => {
  //         res.json(data)
  //         console.log(data)
  //     })
    })







module.exports = router;
