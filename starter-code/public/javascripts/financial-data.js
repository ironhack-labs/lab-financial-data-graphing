const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";

axios
  .get(apiUrl)
  .then(responseFromAPI => {
    printTheChart(responseFromAPI.data); // <== call the function here where you used to console.log() the response
  })
  .catch(err => console.log("Error while getting the data: ", err));

function printTheChart(stockData) {
  const dailyData = stockData["bpi"];

  const stockDates = Object.keys(dailyData);
  const stockPrices = stockDates.map(date => dailyData[date]);

  const ctx = document.getElementById("chart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: stockDates,
      datasets: [
        {
          label: "Bitcoin Price Index",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: stockPrices
        }
      ]
    }
  });
}

function Filter() {
  let fromValue = document.getElementById("from").value;
  let toValue = document.getElementById("to").value;
  let currencyValue = document.getElementById("currency").value;

  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromValue}&end=${toValue}&currency=${currencyValue}`
    )
    .then(responseFromAPI => {
      printTheChart(responseFromAPI.data);
    })
    .catch(err => console.log("Error while getting the data: ", err));
}
