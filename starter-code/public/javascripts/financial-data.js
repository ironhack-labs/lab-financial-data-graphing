var data = axios.get("http://api.coindesk.com/v1/bpi/historical/close.json").then(response => {
  console.log(response);
});

var button = document.querySelector('body > div > input[type="submit"]:nth-child(5)');
button.addEventListener("click", () => {
  var start = document.getElementById("from").value;
  var end = document.getElementById("to").value;
  var currency = document.getElementById("selected").value;

  console.log(start, end, currency);
  axios
    .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`)
    .then(response => {
      console.log(response);

      createChart(Object.keys(response.data.bpi), Object.values(response.data.bpi));
      

      return response.data;
    })
    .catch(err => {
      alert(err);
    });
});

var ctx = document.getElementById("myChart").getContext("2d");

function createChart(keys, value) {
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: keys,
      datasets: [
        {
          label: "Bitcoin Price Index",
          data: value,
          backgroundColor: "rgba(255,0,0,0.2)",
          borderColor: "black",
          borderWidth: 2
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
}


