const express = require('express');
const router = express.Router();
// const financialData = require('./../public/javascripts/financial-data')

// console.log(financialData)

// const financialApi = new FinancialData("http://api.coindesk.com/v1/bpi/historical/close.json");
// getData()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Financial Data Graphing' });
});


module.exports = router;



