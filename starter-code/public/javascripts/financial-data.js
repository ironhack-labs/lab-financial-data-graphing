const coinInfo  = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/',
});

coinInfo.get(`historical/close.json`)
  .then(response => {
    printTheChart(response.data);
  })
  .catch(error => {
    console.log(error);
});

const printTheChart = (coinData => {
  const coinLabels = [];
  const coinPrice = [];
  for (key in coinData.bpi) {
    coinLabels.push(key);
    coinPrice.push(coinData.bpi[key])
  }
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: coinLabels,
      datasets: [{
        label: "Bitcoin Chart",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: coinPrice,
      }]
    }
  });
});