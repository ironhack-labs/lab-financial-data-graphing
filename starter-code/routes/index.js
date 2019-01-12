var express = require('express');
var router = express.Router();

const now = new Date () // date d'aujourd'hui
const endDate = now.toISOString().split("T")[0]; // date d'aujourd'hui formatée
const startDate = new Date(now-(1000*3600*24*31)).toISOString().split("T")[0] // date d'aujourd'hui moins 1 mois

const currency = 


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
    startDate,
    endDate,
    currency
  });
});

module.exports = router;

