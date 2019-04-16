let startDate = '2019-03-19';
let endDate = '2019-03-25';
let currency = 'USD';

document.querySelector('#start').onchange = function (e) {
  startDate = e.target.value;
  drawChart();
}

document.querySelector('#end').onchange = function (e) {
  endDate = e.target.value;
  drawChart();
}

document.querySelector('#currency').onchange = function (e) {
  currency = e.target.value;
  console.log(currency);
  drawChart();
}

function drawChart() {
  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`)
    .then(stockInfo => {
      stockInfo = stockInfo.data
      var stockDate = Object.keys(stockInfo.bpi);
      var stockValue = stockDate.map(function (k) {
        return stockInfo.bpi[k];
      });
      const ctx = document.querySelector('#chart').getContext('2d');
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: stockDate,
          datasets: [{
            label: "Bitcoins value",
            borderWidth: 3,
            borderColor: 'rgb(255, 99, 132)',
            data: stockValue,
          }]
        }
      });
    }
    )
}