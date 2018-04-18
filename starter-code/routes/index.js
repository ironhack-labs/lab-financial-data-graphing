const express = require('express');
const router  = express.Router();
const api_url = "http://api.coindesk.com/v1/bpi/historical/close.json"

/* GET home page */
router.get('/', (req, res, next) => {
  
  res.render('index');
});

module.exports = router;
