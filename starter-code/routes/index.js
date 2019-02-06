var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Express' });
});

router.get('/prueba', (req,res,next)=>{

  console.log("He entrado")

})

module.exports = router;
