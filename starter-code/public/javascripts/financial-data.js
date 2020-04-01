// const key = "demo";
// const functionName = "TIME_SERIES_DAILY";
// const symbolName = "MSFT";
// const apiUrl = `https://www.alphavantage.co/query?function=${functionName}&symbol=${symbolName}&apikey=${key}`;

axios
  .get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then(responseFromAPI => {
    printTheChart(responseFromAPI.data);
  })
  .catch(err => {
    console.log('Error while getting the data: ', err);
  });

function printTheChart(stockData) {
  const bitcoinDates = Object.keys(stockData);
  const bitcoinPrices = Object.values(stockData);
  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    debugger
    type: 'line',
    data: {
      labels: ['dates'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
