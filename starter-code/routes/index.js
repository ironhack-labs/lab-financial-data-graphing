const express = require('express')
const router = express.Router()
const moment = require('moment')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Bitcoin Index',
    moment
  })
})

module.exports = router
