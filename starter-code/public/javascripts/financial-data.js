const coinDesk = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/"
});

var data;
var global;

const objectCoin = coinDesk
  .get("/historical/close.json")
  .then(res => {
    data = res.data.bpi;
    var myCharts = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "BitCoin value",
            data: Object.values(data)
          }
        ],
        labels: Object.keys(data)
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

  //
  .catch(console.error);
var ctx = document.getElementById("myChart").getContext("2d");

function dateRange() {
  var debut = document.getElementById("debut").value;
  var fin = document.getElementById("fin").value;
  console.log("Date de début : " + debut + " Date de fin : " + fin);
}

var submit = document.getElementById("button");

submit.addEventListener(
  "click",
  dateRange
  //   ,myChart.update(
  //     coinDesk
  //       .get(`/historical/close.json?start=${debut}&end=${fin}`)
  //       .then(res => {
  //         data = res.data.bpi;
  //       })
  //       .catch(console.error))
);
