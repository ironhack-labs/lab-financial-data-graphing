var express = require('express');
var router = express.Router();
const axios = require("axios")


/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then(data => console.log(Object.keys(data.data.bpi),Object.values(data.data.bpi)))

res.render('index', { title: 'Express' });
});

router.get("/")





module.exports = router;
