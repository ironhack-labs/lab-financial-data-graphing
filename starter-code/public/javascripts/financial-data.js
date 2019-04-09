'use strict';

// Handler when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () { 
  var startdatePicker = document.getElementById('startDatePicker');
  var enddatePicker = document.getElementById('endDatePicker');
  var currencyPicker = document.getElementById('currencyPicker');
  // placeholder values
  enddatePicker.value = moment().subtract(1, 'days').format('YYYY-MM-DD')
  startdatePicker.value = moment().subtract(1, 'months').format('YYYY-MM-DD');
  currencyPicker.value = 'USD';

  startdatePicker.addEventListener('change', event => {
    getFinanceData();
  });

  enddatePicker.addEventListener('change', event => {
    getFinanceData();
  });

  currencyPicker.addEventListener('change', event => {
    getFinanceData();
  })

  // for first run - start 
  getFinanceData();
  // for first run - end 
});

function getFinanceData() {
  let startDate = document.getElementById('startDatePicker').value;
  let endDate = document.getElementById('endDatePicker').value;
  let currency = document.getElementById('currencyPicker').value;
  var currencySign = getCurrencySign(currency); 
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
    .then(result => {
      let financeData = result.data.bpi; 
      printTheChart(financeData, currencySign);
      displayMaxMin(Object.values(financeData), currencySign);
    })
    .catch(err => {
      console.log(err);
    })
};

function printTheChart(stockData, currencySign) {
  const labels = Object.keys(stockData); //change object to array (keys)
  const values = Object.values(stockData); //change object to array (values)
  
  // delete old canvas and create new on. This fixes the hover issue between old and new data
  deleteOldChart(); 

  // draw chart
  const ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Bitcoin Price Index (BPI) chart',
        data: values,
        backgroundColor: '#41C793', // color of the dots
        bordercolor: '#4175C7', // color of the line
        fill: true,
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
            beginAtZero: true,
            // Include the currency before the value
            callback: function(value, index, values) {
              return currencySign + ' ' + value;
            }
          }
        }]
      }
    }
  })
};

// delete old chart and make new canvas
function deleteOldChart() {
  let container = document.getElementById('chart-container');
  let oldInstance = document.getElementById('myChart');
  container.removeChild(oldInstance);
  let newInstance = document.createElement("canvas");
  newInstance.setAttribute("id", "myChart");
  container.appendChild(newInstance);
}

// change currency letters to sign
function getCurrencySign(currencyLetters) {
  switch(currencyLetters) {
    case 'USD': return '$' 
    case 'EUR': return '€' 
  }
}

// display min max
function displayMaxMin(arrayValues, currencySign) {
  let maxValue = Math.round(Math.max(...arrayValues));
  let minValue = Math.round(Math.min(...arrayValues)); 
  document.getElementById('min-value').innerHTML = currencySign + ' ' + minValue;
  document.getElementById('max-value').innerHTML = currencySign + ' ' + maxValue;
  console.log(maxValue, minValue);
}