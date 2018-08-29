var express = require('express');
var router = express.Router();
var axios = require("axios")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});



axios.get("http://api.coindesk.com/v1/bpi/historical/close.json").then(result => {

  let keys = Object.keys(result.data.bpi)
  let values = Object.values(result.data.bpi)




  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: keys,
      datasets: [{
        label: '# of Votes',
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',

        ],
        borderWidth: 1
      }]
    },
    options: {
    }
  });








})





module.exports = router;
