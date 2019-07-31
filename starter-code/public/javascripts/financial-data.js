const bitCoin = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/historical"
});

draw();
desdeChange = 0;
hastaChange = 0;
let desde = document.getElementById("start");
let hasta = document.getElementById("end");

desde.addEventListener("change", function() {
  desdeChange = this.value;
});
hasta.addEventListener("change", function() {
  hastaChange = this.value;

  //   desde = "2019-05-01";
  //   hasta = "2019-07-31";
  draw(desdeChange, hastaChange);
});
function draw(desde, hasta) {
  if (desde == undefined) {
    desde = "2019-07-01";
  }
  if (hasta == undefined) {
    hasta = "2019-07-31";
  }

  const ctx = document.getElementById("canvas").getContext("2d");

  const bcChart = (dates, values) => {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "# of Votes",
            data: values,
            borderColor: "rgba(0, 50, 250, .7)",
            backgroundColor: "rgba(0, 250, 50, .2)",
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{ ticks: { beginAtZero: true } }]
        }
      }
    });
  };

  bitCoin

    .get(`close.json?start=${desde}&end=${hasta}`)
    .then(response => {
      const values = [];
      const dates = [];

      for (let key in response.data.bpi) {
        values.push(response.data.bpi[key]);
        dates.push(key);
      }

      bcChart(dates, values);
    })
    .catch(error => {
      console.log(error);
    });
}
