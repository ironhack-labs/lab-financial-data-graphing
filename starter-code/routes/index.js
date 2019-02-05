var express = require('express');
var router = express.Router();
var axios = require ('axios')
/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tu puta madre' });
});



axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
.then(data=>{
  console.log(data)
})

.catch(err=>{console.log('Nope')})

module.exports = router;
