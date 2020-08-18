const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => res.render('index', { title: 'LAB | Financial Data Graphing' }));

module.exports = router;
