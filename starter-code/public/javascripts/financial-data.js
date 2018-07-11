$(document).ready(function() {
  let draw = function() {
    let start = $("#start").val();
    let end = $("#end").val();
    let currency = $("#currency").val();

    console.log(start);
    console.log(end);
    let data = axios
      .get(
        `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`
      )
      .then(function(data) {
        chart(data.data);
        console.log(data.data.bpi);
      });
  };

  draw();

  $("#start").on("change", function() {
    draw();
  });

  $("#end").on("change", function() {
    draw();
  });

  $("#currency").on("change", function() {
    draw();
  });

  let chart = function(data) {
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Object.keys(data.bpi),
        datasets: [
          {
            label: "Bitcoin Price Index",
            data: Object.values(data.bpi),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
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
  };
});
