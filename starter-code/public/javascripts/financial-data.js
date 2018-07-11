let labels = [];
let value = [];

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
});

axios.get("http://api.coindesk.com/v1/bpi/historical/close.json").then(data => {
  labels = Object.keys(data.data.bpi);
  value = Object.values(data.data.bpi);
  for (var i = 0; i < labels.length; i++) {
    myChart.data.labels[i] = labels[i];
    myChart.data.datasets[0].data[i] = value[i];
    myChart.data.datasets[0].backgroundColor[i] = "rgba(75, 192, 192, 1)";
  }
  myChart.update();
  console.log(labels, value);
});
