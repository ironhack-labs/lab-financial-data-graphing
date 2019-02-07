const stockInfo = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/',
});

const printChart = ((stockData) => {
  const stockLabels = [];
  const stockPrice = [];

  for (key in stockData.bpi) {
    stockLabels.push(key);
    stockPrice.push(stockData.bpi[key])
  }

  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockLabels,
      datasets: [{
        label: 'Stock Chart',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: stockPrice
      }]
    }
  });
});

stockInfo.get('historical/close.json').then((response) => {
  printChart(response.data);
}).catch((error) => {
  console.log(error);
});
