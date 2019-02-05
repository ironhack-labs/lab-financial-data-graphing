var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IH20190205: Lab Financial Data Graphing' });
});

// router.post('/', function(req, res, next) {
//   let {startDate, endDate} = req.body 
//   res.render('index', { 
//     title: 'IH20190205: Lab Financial Data Graphing',
//     startDate: startDate,
//     endDate: endDate,
//    });
//   console.log(req.body)
// })

module.exports = router;