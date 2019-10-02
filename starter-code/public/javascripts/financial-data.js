axios
  .get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then((CoinAPI) => {
    printTheChart(CoinAPI.data.bpi); // <== call the function here where you used to console.log() the response
  })
  .catch(err => console.log('Error while getting the data: ', err));

function printTheChart(stockData) {

  const stockDates = Object.keys(stockData);
  const stockPrices = Object.values(stockData);

  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockDates,
      datasets: [
        {
          label: 'Bitcoin',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: stockPrices,
        },
      ],
    },
  }); // closes chart = new Chart()
} // closes printTheChart()
