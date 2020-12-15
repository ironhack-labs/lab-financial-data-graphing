const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => res.render('index', { title: 'Bitcoin Price Index' }));

module.exports = router;
