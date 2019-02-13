const router = require('express').Router();
const axios = require ('axios')
const url = 'https://api.coindesk.com/v1/bpi/historical/close.json'




router.get('/', (req, res, next) =>{
  axios.get(url)
  .then(results=>{
    let labels = Object.keys(results.data.bpi)
    let data = Object.values(results.data.bpi)
    res.render('index',{labels, data})
  })
  .catch(e =>{
    res.render('error', e)
  })
})

router.post('/', (req, res) => {
  const url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${req.body.from}&end=${req.body.to}`
  axios.get(url)
 .then(results => {
   console.log(results)
    let keys = Object.keys(results.data.bpi)
    let values = Object.values(results.data.bpi)
    res.render('index', {keys, values} );
 })
 .catch(e=> {
   res.render('error', e)
 })
})

module.exports = router;