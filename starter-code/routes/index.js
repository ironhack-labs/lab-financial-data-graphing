var express = require('express');
var router = express.Router();


const axios = require('axios')
const endpoints = 'http://api.coindesk.com/v1/bpi/historical/close.json'
const moment = require('chart.js')

/* GET home page. */

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
/* GET users listing. */
let hoy = new Date()
let dd = hoy.getDate();
let mm = hoy.getMonth()+1; 
let yyyy = hoy.getFullYear();
if(dd<10) dd=`0${dd}`
if(mm<10) mm=`0${mm}`
hoy = `${yyyy}-${mm}-${dd}`
hoyFrom = `${yyyy}-${mm}-01`

router.post('/', (req, res, next) => {
  const { fromDate, toDate} = req.body
  if(!fromDate) fromDate = Date.now()
  axios
  .get(`${url}?start=${fromDate}&end=${toDate}`)
    .then(results => {
      let labels = Object.keys(results.data.bpi)
      let data = Object.values(results.data.bpi)
      let maxVal = Math.max(...Object.values(results.data.bpi))
      let minVal = Math.min(...Object.values(results.data.bpi))
      res.render('index', { labels, data,hoy, hoyFrom , maxVal, minVal })

    })
    .catch(e => next(e))
})


router.get('/',function(req, res, next) {
  axios
  .get(endpoints)
 
  .then(response => {
    const labels = Object.keys(response.data.bpi)
    const data = Object.values(response.data.bpi)
    const maxVal = Math.max(...Object.values(response.data.bpi))
    const minVal = Math.min(...Object.values(response.data.bpi))
    res.render("index",{labels,data,hoy, hoyFrom , maxVal, minVal})
    
  })
  .catch(err => {
    console.log(err);
  });
});

module.exports = router;
