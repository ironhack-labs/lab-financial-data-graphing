var express = require('express');
var axios = require('axios')
var router = express.Router();
const path = require('path')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



  
module.exports = router;
