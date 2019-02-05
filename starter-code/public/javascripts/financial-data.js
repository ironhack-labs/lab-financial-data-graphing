const intervalDates = {
  start: "2019-01-01",
  end: "2019-12-31"
};

function conectApi(start, end) {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`
    )

    .then(date => {
      myFin(date);
    })
    .catch(err => {
      console.log(err);
    });
}
conectApi(intervalDates.start, intervalDates.end);

function myFin(date) {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Object.keys(date.data.bpi), // y = fechas = keys
      datasets: [
        {
          label: "Bitcoins Price Index",
          data: Object.values(date.data.bpi), // x = valores = values
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255,99,132,1)"],
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
}

document.getElementById("startDate").onchange = e => {
  console.log(e.target.value);
  start = e.target.value;
  conectApi(start, document.getElementById("endDate").value);
};

document.getElementById("endDate").onchange = e => {
  console.log(e.target.value);
  end = e.target.value;
  conectApi(document.getElementById("startDate").value, end);
};
