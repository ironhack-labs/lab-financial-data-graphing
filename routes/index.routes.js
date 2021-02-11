const express = require('express');
const router = express.Router();
const axios = require('axios');

//home page
router.get('/', (req, res) => {
    res.render('index', { title: 'Chart JS' });
});

module.exports = router;
