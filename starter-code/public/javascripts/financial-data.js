//Initial Request Done When Page Loads.
axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then(responseFromAPI => {
    printTheChart(responseFromAPI.data);
  })
  .catch(err => console.log("Error while getting the data: ", err));

//Once selected start date, end date and currency we make new request.
document.getElementById("button").onclick = function () {

  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const currency = document.getElementById("currency").value;

  const urlApi = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`;

  // console.log(urlApi)

  axios
    .get(urlApi)
    .then(responseFromAPI => {
      printTheChart(responseFromAPI.data);
    })
    .catch(error => {
      console.log("The error is: ", error);
    });
}

//Function that Draws each time new data is uploaded
function printTheChart(stockData) {

  const dailyData = stockData["bpi"]; //devuelve objeto con fecha y precio
  const stockDates = Object.keys(dailyData); //devuelve fechas
  const stockPrices = stockDates.map(date => dailyData[date]); //devuelve precios

  // console.log(dailyData)
  // console.log(stockDates)
  //console.log(stockPrices)

  //Max and Min Prices
  let maxPrice = Math.max(...stockPrices);
  let minPrice = Math.min(...stockPrices);

  document.getElementById("maxPrice").innerHTML = maxPrice
  document.getElementById("minPrice").innerHTML = minPrice

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