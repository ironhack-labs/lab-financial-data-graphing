var express = require('express');
var router = express.Router();
// var input = document.getElementById("bit").value

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;