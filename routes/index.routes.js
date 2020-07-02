const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index', { title: 'Bitcoin Chart.JS' }));

module.exports = router;
