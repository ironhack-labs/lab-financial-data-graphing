const express = require('express')
const router = express.Router()
const axios = require('axios')

/* GET home page. */
router.get('/', async (req, res, next) => {
  const { data } = await axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
  res.render('index', data)
})
module.exports = router
