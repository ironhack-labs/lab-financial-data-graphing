const express = require('express');
const router = express.Router();
const axios = require('axios');
const test = require('/public/javascripts/financial-data.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', (req, res, next) => {
    const bitcoindata = axios.create({
      url: "http://api.coindesk.com/v1/bpi/historical/close.json" + "?start=" + req.body.inputInicio + "&end=" + req.body.inputFin
     });
    bitcoindata.get()
    .then((res) => {
      test.printTheChart(res.data.bpi);
      res.json(res.data.bpi);
    })
    .catch((err) => {
      console.log(err);
    })
  });

module.exports = router;
