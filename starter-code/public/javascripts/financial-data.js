// Ask if axios is already defined
const bitcoinChart = axios.create({
  baseURL: 'https://api.coindesk.com/v1/bpi/historical/close.json',
});

function getBitcoinChart() {
  bitcoinChart.get()
    .then(res => printTheChart(res.data.bpi))
    .catch(err => next(err));
}

const printTheChart = ((stockData) => {
  const stockLabels = Object.keys(stockData);
  const stockPrice = Object.values(stockData);
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockLabels,
      datasets: [{
        label: 'Stock Chart',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: stockPrice,
      }],
    },
  });
});

getBitcoinChart();
