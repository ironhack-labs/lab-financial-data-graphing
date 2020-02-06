const valueChange = () => {
  const fromDate = document.getElementById("from").value;
  const toDate = document.getElementById("to").value;

  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`
    )
    .then(response => {
      const priceData = response.data.bpi;
      console.log(response.data.bpi);
      var ctx = document.getElementById("myChart").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: Object.keys(priceData),
          datasets: [
            {
              label: "Bitcoin Price Index",
              data: Object.values(priceData),
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
    })
    .catch(err => {
      console.error(err);
    });
};

window.onload = valueChange;
