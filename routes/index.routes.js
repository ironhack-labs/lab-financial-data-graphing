const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'LAB | Financial Data Graphing' })
});

module.exports = router;
