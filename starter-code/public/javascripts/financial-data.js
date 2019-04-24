var ctx = document.getElementById("myChart").getContext("2d");
const dollar = document.getElementsByClassName("currency_dollar");
const euro = document.getElementsByClassName("currency_euro");
const peso = document.getElementsByClassName("currency_peso");
if (dollar) {
  axios
    .get("http://api.coindesk.com/v1/bpi/historical/close.json?currency=USD")
    .then(response => {
      const data = response.data.bpi;
      let value = Object.values(data);
      let params = Object.keys(data);
      console.log(value);
      var myLineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: params,
          datasets: [
            {
              label: "Bitcoin Price Index",
              data: value,
              backgroundColor: ["grey"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: 12
                }
              }
            ]
          }
        }
      });
    })
    .catch(err => res.send(err));
} else if (euro) {
  axios
    .get("http://api.coindesk.com/v1/bpi/historical/close.json?currency=EUR")
    .then(response => {
      const data = response.data.bpi;
      let value = Object.values(data);
      let params = Object.keys(data);
      console.log(value);
      var myLineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: params,
          datasets: [
            {
              label: "Bitcoin Price Index",
              data: value,
              backgroundColor: ["grey"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: 12
                }
              }
            ]
          }
        }
      });
    })
    .catch(err => res.send(err));
} else if (peso) {
  axios
    .get("http://api.coindesk.com/v1/bpi/historical/close.json?currency=MXN")
    .then(response => {
      const data = response.data.bpi;
      let value = Object.values(data);
      let params = Object.keys(data);
      console.log(value);
      var myLineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: params,
          datasets: [
            {
              label: "Bitcoin Price Index",
              data: value,
              backgroundColor: ["grey"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: 12
                }
              }
            ]
          }
        }
      });
    })
    .catch(err => res.send(err));
} else {
  var domName = document.createElement("p");
  domName.innerHTML = "Mal";
}
