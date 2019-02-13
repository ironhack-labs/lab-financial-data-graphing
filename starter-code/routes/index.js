var router = require('express').Router();
const axios = require('axios')
const Chart = require('chart.js')

const coindesk = 'https://api.coindesk.com/v1/bpi/historical/close.json'

let ctx = document.getElementById("myChart").getContext('2d');
let myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(axios.get(coindesk))
  // axios.get(coindesk)
  //     .then(=>{
        res.render('chart', myChart)
        // res.render('chart', {data})
      // })
      // .catch(e=>console.log(e))
});


module.exports = router;
