let startDate = '2019-03-19';
let endDate = '2019-03-25';
let currency = 'USD';
var chart = document.getElementById("chart");

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
  const ctx = document.querySelector('#chart').getContext('2d');
  ctx.clearRect(0, 0, chart.innerWidth, chart.innerHeight);
  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`)
    .then(stockInfo => {
      stockInfo = stockInfo.data
      var stockDate = Object.keys(stockInfo.bpi);
      var stockValue = stockDate.map(function (k) {
        return stockInfo.bpi[k];
      });
      let max = Math.max.apply(null,stockValue);
      let min = Math.min.apply(null,stockValue);
      document.querySelector('#max').innerHTML = `Max: ${max} ${currency}`;
      document.querySelector('#min').innerHTML = `Min: ${min} ${currency}`;
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