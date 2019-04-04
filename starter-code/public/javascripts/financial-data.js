'use strict';

var financeData;
getFinanceData();

function getFinanceData() {
  axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
    .then(result => {
      // console.log(result); 
      financeData = result.data.bpi;
      console.log(financeData);
      printTheChart(financeData);
    })
    .catch(err => {
      console.log(err);
    })
};


// var myChart = new myChart(ctx, {
//   type: 'line',
//   data: financeData,
//   options: {
//     xAxisID: data.
//   }
// })

function printTheChart(stockData) {
  const labels = Object.keys(stockData); //change object to array (keys)
  const values = Object.values(stockData); //change object to array (values)
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'BPI chart',
        data: values,
        backgroundColor: '#41C793', // color of the dots
        bordercolor: '#4175C7', // color of the line
        fill: false,
        pointHoverRadius: 6
      }]
    },
    options: {
      legend: {
        position: 'right'
      },
      title: {
        display: true,
        text: 'BPI overview of the previous period'
      }
    }
  })
};