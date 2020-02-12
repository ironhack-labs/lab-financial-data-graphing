
const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json';

axios
  .get(apiUrl)
  .then(responseFromAPI => {
    printTheChart(responseFromAPI.data); 
  })
  .catch(err => {
    console.log("Error while getting the data: ", err);
  });

function printTheChart(stockData) {
  const dailyData = stockData["bpi"];

  const stockDates = Object.keys(dailyData);
  const stockPrices = stockDates.map(date => {
    return dailyData[date];
  });

  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockDates,
      datasets: [
        {
          label: "Bitcoin Price Index",
          backgroundColor: "rgb(217, 224, 223)",
          borderColor: "rgb(105, 155, 152)",
          pointBackgroundColor: "white",
          data: stockPrices
        }
      ]
    }
  }); 
}
