const express = require('express');
const router = express.Router();
const axios = require('axios');

// const baseUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'BPI' });
});

module.exports = router;
