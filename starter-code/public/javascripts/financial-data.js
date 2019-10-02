// Get API
// const axios = require('axios');

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
      datasets: [
        {
          label: 'Bitcoin Price Index Chart',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: prices,
        },
      ],
    },
  });
}
