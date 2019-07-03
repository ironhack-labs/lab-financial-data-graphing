var ctx = document.getElementById("myChart").getContext("2d");

axios
  .get(
    "https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-01-01&end=2019-06-03"
  )
  .then(response => {
    console.log(response.data.bpi);
    console.log(Object.keys(response.data.bpi));
    console.log(Object.values(response.data.bpi));
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: Object.keys(response.data.bpi),
          datasets: [
            {
              label: "# of Votes",
              data: Object.values(response.data.bpi),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
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
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
  });

