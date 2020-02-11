const baseURL = "http://api.coindesk.com/v1/bpi/historical/close.json";
axios
  .get(baseURL)
  .then(dataPayload => {
    console.log(dataPayload.data.bpi);
    const myKeys = Object.keys(dataPayload.data.bpi);
    const myValues = Object.values(dataPayload.data.bpi);
    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: myKeys,
        datasets: [
          {
            label: "Bitcoin Price Index",
            data: myValues,
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                stepSize: 500
              }
            }
          ]
        }
      }
    });
  })
  .catch(err => console.log(err));


