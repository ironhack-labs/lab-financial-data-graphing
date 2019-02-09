axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then((response) => {
    printTheChart(response.data.bpi);
  })
  .catch((err) => {
    console.log(err);
  });

function printTheChart(data) {
  console.log(data);
  const coinLabels = [];
  const coinPrices = [];

  for (key in data) {
    coinLabels.push(key);
    coinPrices.push(data[key]);
  }

  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: coinLabels,
      datasets: [{
        label: 'Stock Chart',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: coinPrices
      }]
    }
  });
}

function updateChart() {
  const start = document.getElementById('fromDate').value;
  const end = document.getElementById('toDate').value;

  console.log('ccccc', start, end);

  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
    .then((response) => {
      printTheChart(response.data.bpi);
    })
    .catch((err) => {
      console.log(err);
    });
}

const fromDate = document.getElementById('fromDate');
const toDate = document.getElementById('toDate');
const changeDate = document.getElementById('changeDate');
