let fromDateInput = document.getElementById("date-from");
let toDateInput = document.getElementById("date-to");
let currencyInput = document.getElementById("currency");

axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then(response => {
    let x = Object.values(response.data.bpi);
    let y = Object.keys(response.data.bpi);

    fromDateInput.value = y[0];
    toDateInput.value = y[y.length - 1];

    drawChart(x, y);
  });

const updateChart = () => {
  axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDateInput.value}&end=${toDateInput.value}&currency=${currencyInput.value}`
    )
    .then(response => {
      let x = Object.values(response.data.bpi);
      let y = Object.keys(response.data.bpi);
      drawChart(x, y);
    });
};

function drawChart(xData, yData) {
  // update min/max values
  let minP = document.getElementById("min");
  minP.innerText = `Min: ${xData[0]} ${currencyInput.value}`;
  let maxP = document.getElementById("max");
  maxP.innerText = `Max: ${xData[xData.length - 1]} ${currencyInput.value}`;

  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: yData,
      datasets: [
        {
          label: "Bitcoin Price Index",
          data: xData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false
            }
          }
        ]
      }
    }
  });
}
