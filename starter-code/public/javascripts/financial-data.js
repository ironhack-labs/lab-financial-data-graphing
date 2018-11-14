const stockInfo  = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/historical/',
});

stockInfo.get(`close.json`)
    .then(response => {
      printTheChart(response.data.bpi);
    })
    .catch( error => {
      console.log(error);
  });

const printTheChart = (bitCoinData => {
  const bitCoinDataDate = Object.keys(bitCoinData);
  const bitCoinDataValue = Object.values(bitCoinData);
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: bitCoinDataDate,
      datasets: [{
        label: "BitCoin Data",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: bitCoinDataValue,
      }]
    }
  });
});