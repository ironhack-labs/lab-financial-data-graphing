let axisX;
let axisY;

function drawChart(labels, data) {
  const ctx = document.getElementById("myChart");

  let myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{ label: `Bitcoin Price Index`, data: data }],
    },
  });
}

axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then((response) => {
    axisX = Object.keys(response.data.bpi);
    axisY = Object.values(response.data.bpi);
    drawChart(axisX, axisY);
  })
  .catch((err) => console.log(err));
