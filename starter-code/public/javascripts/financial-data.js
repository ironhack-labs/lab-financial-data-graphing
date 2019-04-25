var data = axios
  .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
  .then(response => {
    console.log(response.data.bpi);
    console.log(Object.values(response.data.bpi));
    createChart(
      Object.keys(response.data.bpi),
      Object.values(response.data.bpi)
    );
    document.getElementById("minimum").innerHTML = Math.min.apply(
      null,
      Object.values(response.data.bpi)
    );
    document.getElementById("maximum").innerHTML = Math.max.apply(
      null,
      Object.values(response.data.bpi)
    );
    return response.data;
  })
  .catch(err => {
    alert(err);
  });

function createChart(datadate, dataactual) {
  console.log(data);
  var ctx = document.getElementById("linechart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: datadate,
      datasets: [
        {
          label: "Bicoin Price",
          data: dataactual,
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

changedate = (startdate, enddate) => {
  startdate = document.getElementById("startdate").value;
  enddate = document.getElementById("enddate").value;
  currency = document.getElementById("currency").value;
  url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startdate}&end=${enddate}&currency=${currency}`;
  data = axios
    .get(url)
    .then(response => {
      console.log(response.data.bpi);
      console.log(Object.keys(response.data.bpi));
      createChart(
        Object.keys(response.data.bpi),
        Object.values(response.data.bpi)
      );
      document.getElementById("minimum").innerHTML = Math.min.apply(
        null,
        Object.values(response.data.bpi)
      );
      document.getElementById("maximum").innerHTML = Math.max.apply(
        null,
        Object.values(response.data.bpi)
      );
      return response.data;
    })
    .catch(err => {
      alert(err);
    });
};
