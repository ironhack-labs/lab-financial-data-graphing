let startDate = "";
const startingInput = document.getElementById("StartDate");
startingInput.addEventListener("input", (event) => {
  console.log(event.target.value);
  startDate = event.target.value;
});

let endDate = "";
const endInput = document.getElementById("EndDate");
endInput.addEventListener("input", (event) => {
  console.log(event.target.value);
  endDate = event.target.value;
});

axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json?start="+startDate+"&end="+endDate)
  .then((response) => {
    console.log("response:", response.data);
    const labels = Object.keys(response.data.bpi);
    const data = Object.values(response.data.bpi);
    drawChart(labels, data);
  })
  .catch((err) => {
    console.log("err:", err.message);
  });
function drawChart(labels, data) {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
        },
      ],
    },
  });
}
