axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then(results => {
    priceChart(results.data.bpi);
  })
  .catch(err => console.log("Error while getting the data: ", err));

const priceChart = results => {
  const ctx = document.getElementById("myChart").getContext("2d");
  const stockDates = Object.keys(results);
  const stockPrices = stockDates.map(date => results[date]);

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockDates,
      datasets: [
        {
          label: "Stock Chart",
          backgroundColor: "rgb(251, 123, 32)",
          borderColor: "rgb(255, 99, 132)",
          data: stockPrices
        }
      ]
    }
  });
};
