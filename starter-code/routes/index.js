const express = require('express');
const router = express.Router();

// const baseUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'BPI Prices' });
});

module.exports = router;
