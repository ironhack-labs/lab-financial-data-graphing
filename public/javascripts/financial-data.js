let bitCoinData;
let myLineChart;

let ctx = document.getElementById("myChart").getContext("2d");

axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then((response) => {
    // console.log(response.data.bpi);
    return response.data.bpi;
  })
  .then((bitCoinData) => {
    // first get the values as arrays
    let bitCoinValue = Object.values(bitCoinData);
    let bitCoinDates = Object.keys(bitCoinData);

    drawChart(bitCoinDates, bitCoinValue);
  })
  .catch((error) => {
    console.log(error);
  });

function drawChart(chartLabels, chartData) {
  myLineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: chartData,
        },
      ],
    },
  });
}
