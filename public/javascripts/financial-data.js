const url = "http://api.coindesk.com/v1/bpi/historical/close.json";

axios
  .get(url)
  .then((response) => {
    printTheChart(response.data);
  })
  .catch((err) => {
    console.error(err);
  });

function printTheChart(dataChar) {
  const dailyData = dataChar["bpi"];
  const stockDates = Object.keys(dailyData);
  const stockPrices = stockDates.map((date) => {
    return dailyData[date];
  });

  console.log(stockPrices)

  const ctx = document.getElementById("my-chart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockDates,
      datasets: [
        {
          label: "Bitcoin Price Index",
          backgroundColor: "transparent",
          borderColor: 'rgb(255, 99, 132)',
          data: stockPrices
        }
      ]
    }
  });
}