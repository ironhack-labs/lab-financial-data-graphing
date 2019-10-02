// Get API
// const axios = require('axios');

axios
  .get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then((responseFromAPI) => {
    console.log('The response from API: ', responseFromAPI);
    printTheChart(responseFromAPI);
  })
  .catch((err) => console.log('Error while getting the data: ', err));

axios
  .get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then((responseFromAPI) => {
    console.log('The response from API: ', responseFromAPI);
    printTheChart(responseFromAPI);
  })
  .catch((err) => console.log('Error while getting the data: ', err));

// Create the Chart

function printTheChart(bitcoinPriceData) {
  const priceChart = bitcoinPriceData.data.bpi;
  const priceDates = Object.keys(priceChart);
  const prices = Object.values(priceChart);
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: priceDates,
      datasets: [{
        label: 'Bitcoin Price Index Chart',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: prices,
      }, ],
    },
  });
}

function updateChart(bitcoinPriceData) {
  const priceChart = bitcoinPriceData.data.bpi;
  // const priceDates = Object.keys(priceChart);
  const prices = Object.values(priceChart);
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: priceDates,
      datasets: [{
        label: 'Bitcoin Price Index Chart',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: prices,
      }, ],
    },
  });
}

// Create the Search Event

const refDates = document.getElementsByClassName('date');

refDates[0].addEventListener('change', () => {
  // console.log(document.getElementById('start-date').value);
  if (startDateChart > endDateChart) {
    console.log('Start Date is higher than End Date!');
  } else {
    console.log('Print!');
  }
});

refDates[1].addEventListener('change', () => {
  // console.log(document.getElementById('end-date').value);
  if (startDateChart > endDateChart) {
    console.log('Start Date is higher than End Date!');
  } else {
    console.log('Print!');
  }
});

let startDateChart = new Date(document.getElementById('start-date').value);
let endDateChart = new Date(document.getElementById('end-date').value);

console.log(document.getElementById('start-date').value);
console.log(document.getElementById('end-date').value);