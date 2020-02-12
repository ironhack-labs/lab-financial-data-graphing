let index = 'USD/CNY';
let currency = (document.getElementById('currency').value = 'USD');
let startDate = (document.getElementById('startDate').value = '2019-09-01');
let endDate = (document.getElementById('endDate').value = '2020-09-05');
let apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?index=${index}&currency=${currency}&start=${startDate}&end=${endDate}`;

document.getElementById('currency').addEventListener('change', () => {
  currency = document.getElementById('currency').value;
  apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?index=${index}&currency=${currency}&start=${startDate}&end=${endDate}`;
  update();
});

document.getElementById('startDate').addEventListener('change', () => {
  startDate = document.getElementById('startDate').value;
  //   console.log('Output for: startDate', startDate);
  apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?index=${index}&currency=${currency}&start=${startDate}&end=${endDate}`;
  update();
});
document.getElementById('endDate').addEventListener('change', () => {
  endDate = document.getElementById('endDate').value;
  apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?index=${index}&currency=${currency}&start=${startDate}&end=${endDate}`;
  update();
});

// console.log('Output for: apiUrl', apiUrl);

function update() {
  axios
    .get(apiUrl)
    .then(responseFromAPI => {
      console.log('The response from API: ', responseFromAPI);
      printTheChart(responseFromAPI.data);
    })
    .catch(err => console.log(err));

  function printTheChart(stockData) {
    const dailyData = stockData.bpi;
    const stockDates = Object.keys(dailyData);
    // console.log('Output for: dates', dates);
    const stockPrices = stockDates.map(date => dailyData[date]);
    //   console.log('Output for: stockPrices', stockPrices);
    // --------------  max and min values ---------------------------
    document.getElementById('max').innerHTML =
      Math.max(...stockPrices) +
      ' ' +
      document.getElementById('currency').value;
    document.getElementById('min').innerHTML =
      Math.min(...stockPrices) +
      ' ' +
      document.getElementById('currency').value;

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        labels: stockDates,
        datasets: [
          {
            label: 'Bitcoin Price index',
            data: stockPrices,
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
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
}

update();
