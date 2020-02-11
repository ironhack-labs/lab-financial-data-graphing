var express = require('express');
var router = express.Router();
const fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/CoinksData", (req, res) => {
  fs.readFile("https://api.coindesk.com/v1/bpi/currentprice.json", "utf8", (err, CoinksData) => {
    let output = JSON.parse(CoinksData);
    res.json(output);
  });
});

   
module.exports = router;