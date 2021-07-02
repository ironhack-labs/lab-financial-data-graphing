function updateChart() {
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;
  const currency = document.getElementById("currency").value;
  filterData(fromDate, toDate, currency);
}

function printChart(stockDates, stockPrices) {
  const ctx = document.getElementById("my-chart").getContext("2d");

  const minPrice = Math.min(...stockPrices)
  const maxPrice = Math.max(...stockPrices)

  document.getElementById('min').innerText = minPrice
  document.getElementById('max').innerText = maxPrice

  ctx.clearRect(0, 0, 700, 400);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: stockDates,
      datasets: [
        {
          label: "Stock BPI",
          backgroundColor: "rgb(255,215,0)",
          borderColor: "rgb(218,165,32)",
          data: stockPrices,
        },
      ],
    },
  });
}

function filterData(fromDate, toDate, currency) {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`
    )
    .then((response) => {
      const BPI = response.data.bpi;
      const stockDates = Object.keys(BPI);
      const stockPrices = Object.values(BPI);

      printChart(stockDates, stockPrices);
    })
    .catch((err) => console.log("Error while getting the data: ", err));
}


updateChart()
document.getElementById("btn").addEventListener("click", updateChart);




