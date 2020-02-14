axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then(responseFromAPI => {
    printTheChart(responseFromAPI.data);
  })
  .catch(err => console.log("Error while getting the data: ", err));


function printTheChart(stockData) {
  const dailyData = stockData["bpi"]; //devulve objeto con fecha y precio

  const stockDates = Object.keys(dailyData); //devuelve fechas
  const stockPrices = stockDates.map(date => dailyData[date]); //devuelve precios

  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockDates,
      datasets: [{
        label: 'Bitcoin Price Index 📈',
        data: stockPrices,
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)'
        ],

        borderColor: [
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 3
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}