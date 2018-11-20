
let startDate = '2018-10-01';
let endDate = '2018-11-01';


function getBitcoinChart() {
  const bitcoinChart = axios.create({
    baseURL: `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`,
  });
  bitcoinChart.get()
    .then(res => printTheChart(res.data.bpi))
    .catch(err => next(err));

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
}

function clickHandler() {
  startDate = document.querySelector('#start').value;
  endDate = document.querySelector('#end').value;
  getBitcoinChart();
}

document.querySelector('#submit').onclick = clickHandler;

window.onload = () => getBitcoinChart();
