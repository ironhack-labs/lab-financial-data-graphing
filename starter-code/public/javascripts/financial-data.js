var ctx = document.getElementById("myChart").getContext("2d");

var data = axios
  .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
  .then(response => {
    // console.log(response.data.bpi);
    // console.log(Object.keys(response.data.bpi));
    createChart(
      Object.keys(response.data.bpi),
      Object.values(response.data.bpi)
    );

    return response.data;
  })
  .catch(err => {
    alert(err);
  });

var button = document.querySelector("body > button");

button.addEventListener("click", () => {
  var start = document.querySelector("#startDate").value;
  var end = document.querySelector("#endDate").value;
  var currency = document.querySelector("body > select").value;
  console.log(start, end, currency);
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`
    )
    .then(response => {
      // console.log(response.data.bpi);
      // console.log(Object.keys(response.data.bpi));
      createChart(
        Object.keys(response.data.bpi),
        Object.values(response.data.bpi)
      );

      return response.data;
    })
    .catch(err => {
      alert(err);
    });
});

function createChart(dates, data) {
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Price",
          data: data,
          backgroundColor: "rgba(255,255,255,0.75)",
          borderColor: "black",
          borderWidth: 5
        }
      ]
    },
    options: {
      tooltips: { enabled: true },
      hover: { mode: null },
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
