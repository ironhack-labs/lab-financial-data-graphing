var express = require('express');
var router = express.Router();
//var financial = require('../financial-data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/',function(req, res, next){
  console.log(req.body.bdayInitial);
  console.log(req.body.bdayFinal);
  const initial=req.body.bdayInitial;
  const final=req.body.bdayFinal
  res.render('/filter',{initial},{final});
})
router.get('/filter', function(req, res, next) {

  res.render('filter', { title: 'Filter' });
});

module.exports = router;
