const refresh = () => {
  const fromDate = document.getElementById("from").value;
  const toDate = document.getElementById("to").value;

  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`
    )
    .then(response => {
      let graph = response.data.bpi;

      let dates = Object.keys(graph);
      let values = Object.values(graph);

      let ctx = document.getElementById("myChart");
      let myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: dates,
          datasets: [
            {
              label: "Bitcoin chart",
              data: values,

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
};

window.onload = refresh();
