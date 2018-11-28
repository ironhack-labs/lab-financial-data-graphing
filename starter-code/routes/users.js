var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next)=> {
  res.render('index', {title: 'Bitcoin-tracker'});
});

module.exports = router;
