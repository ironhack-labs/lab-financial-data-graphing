const router = require('express').Router();
const axios = require('axios')
const moment = require('chart.js')

const url = 'http://api.coindesk.com/v1/bpi/historical/close.json'

let hoy = new Date()
let dd = hoy.getDate();
let mm = hoy.getMonth()+1; 
let yyyy = hoy.getFullYear();
if(dd<10) dd=`0${dd}`
if(mm<10) mm=`0${mm}`
hoy = `${yyyy}-${mm}-${dd}`
hoyFrom = `${yyyy}-${mm}-01`

router.post('/', (req, res, next) => {
  const { fromDate, toDate, currency } = req.body
  if(!fromDate) fromDate = Date.now()
  axios.get(`${url}?start=${fromDate}&end=${toDate}&currency=${currency}`)
    .then(results => {
      let labels = Object.keys(results.data.bpi)
      let data = Object.values(results.data.bpi)
      let maxVal = Math.max(...Object.values(results.data.bpi))
      let minVal = Math.min(...Object.values(results.data.bpi))
      res.render('index', { labels, data, currency, maxVal, minVal })

    })
    .catch(e => next(e))
})

router.get('/', (req, res, next) => {
  axios.get(url)
    .then(results => {
      let currency = 'USD'
      let labels = Object.keys(results.data.bpi)
      let data = Object.values(results.data.bpi)
      let maxVal = Math.max(...Object.values(results.data.bpi))
      let minVal = Math.min(...Object.values(results.data.bpi))
      res.render('index', { labels, data, hoy, hoyFrom ,currency, maxVal, minVal})
    })
    .catch(e=> next(e))
});

module.exports = router
