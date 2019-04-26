// https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-01-01&end=2019-01-25&currency=USD
let yAxis = [];
let xAxis = [];

window.onload = () => {
  let from = document.querySelector("#start").value;
  let to = document.querySelector("#end").value;
  refreshData(from, to);

  document.querySelector("#start").addEventListener("input", e => {
    console.log("Changed", e.target.value);
    from = e.target.value;
    document.getElementById("myChart");
    refreshData(from, to);
  });

  document.querySelector("#end").addEventListener("input", e => {
    console.log("Changed", e.target.value);
    to = e.target.value;
    refreshData(from, to);
  });
};

function refreshData(from, to) {
  axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}`
    )
    .then(res => {
      let bpi = res.data.bpi;
      xAxis = [];
      yAxis = [];
      for (item in bpi) {
        xAxis.push(item);
        yAxis.push(bpi[item]);
      }
      updateChart(xAxis, yAxis);
    });
}

let ctx = document.getElementById("myChart").getContext("2d");

let myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: xAxis,
    datasets: [
      {
        label: "Bitcoin Price Index",
        data: yAxis,
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
    responsive: true,
    scales: {
      xAxes: [
        {
          type: "time",
          display: true,

          ticks: {
            major: {
              fontStyle: "bold",
              fontColor: "#FF0000"
            }
          }
        }
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "USD"
          }
        }
      ]
    }
  }
});

function updateChart(xAxis, yAxis) {
  // console.log(yAxis);
  myChart.data.datasets[0].data = yAxis;
  myChart.data.labels = xAxis;
  console.log(myChart.data.datasets.data);
  window.myChart = myChart;
  myChart.update();
}
