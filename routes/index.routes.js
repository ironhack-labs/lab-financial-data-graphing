const express = require('express');
const axios = require('axios')
const router = express.Router();

const financialDataController = require('../javascript/financial-data')


/* GET home page. */
router.get('/', financialDataController.printChart)

module.exports = router;