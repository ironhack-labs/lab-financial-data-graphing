var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(_, res) {
  res.render('index');
});
module.exports = router;
