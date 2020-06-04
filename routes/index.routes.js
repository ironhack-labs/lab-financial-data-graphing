const express = require('express');
const router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/', (req, res) => {res.render('index')})

module.exports = router;
