'use strict';

// Handler when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log('test');
  var startdatePicker = document.getElementById('startDatePicker');
  var enddatePicker = document.getElementById('endDatePicker');
  // placeholder value for enddate is date of today
  enddatePicker.value = moment().subtract(1, 'days').format('YYYY-MM-DD')
  startdatePicker.value = moment().subtract(1, 'months').format('YYYY-MM-DD');

  startdatePicker.addEventListener('change', event => {
    getFinanceData();
  });

  enddatePicker.addEventListener('change', event => {
    getFinanceData();
  });

  var financeData;
  getFinanceData();

  function getFinanceData() {
    var startDate = startdatePicker.value;
    var endDate = enddatePicker.value;
    console.log('start', startDate);
    console.log('end', endDate);
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
      .then(result => {
        financeData = result.data.bpi;
        console.log(financeData);
        printTheChart(financeData);
      })
      .catch(err => {
        console.log(err);
      })
  };
 
  function printTheChart(stockData) {
    const labels = Object.keys(stockData); //change object to array (keys)
    const values = Object.values(stockData); //change object to array (values)
    
    // delete old canvas and create new on. This fixes the hover issue between old and new data
    let container = document.getElementById('chart-container');
    let oldInstance = document.getElementById('myChart');
    container.removeChild(oldInstance);
    let newInstance = document.createElement("canvas");
    newInstance.setAttribute("id", "myChart");
    container.appendChild(newInstance);
    
    const ctx = document.getElementById('myChart').getContext('2d');
    
    var chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'BPI chart',
          data: values,
          backgroundColor: '#41C793', // color of the dots
          bordercolor: '#4175C7', // color of the line
          fill: false,
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: 'BPI overview of the previous period'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  };

});