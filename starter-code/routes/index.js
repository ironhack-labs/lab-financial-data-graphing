var express = require('express');
var router = express.Router();
const axios = require('axios')
const endpoint = 'https://api.coindesk.com/v1/bpi/historical/close.json'


//https://api.coindesk.com/v1/bpi/historical/close.json?/start=2013-09-01&end=2013-09-05/?currency="EUR"
router.post('/', (req,res,next)=>{
    const {fromDate} = req.body
    const {toDate} = req.body
    const {toCurrency} = req.body
    const search = `${endpoint}/?start=${fromDate}&end=${toDate}&currency=${toCurrency}`
    axios.get(search)
        .then(results=>{
        let labels = Object.keys(results.data.bpi)
        let data = Object.values(results.data.bpi)
        const minValue = Math.min.apply(null,data)
        const maxValue = Math.max.apply(null,data)
            console.log(labels);
        res.render('index', { labels, data, minValue, maxValue })
    })
    .catch(e=> next(e))
})


router.get('/', function(req, res, next) {
    axios.get(endpoint)
        .then(results => {
            const labels = Object.keys(results.data.bpi)
            const data = Object.values(results.data.bpi)
            res.render('index', { labels, data })
            console.log(labels)
        })
        .catch(e=> next(e))
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
