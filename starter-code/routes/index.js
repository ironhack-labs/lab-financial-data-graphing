var express = require('express')
var cookie = require('cookie-parser')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('enter', (req, res) =>{
  req.cookies("Entered", "true", {signed: true})
  req.redirect("/financial-data")
})

module.exports = router;
