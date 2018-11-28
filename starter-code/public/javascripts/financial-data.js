const currencyInfo = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/historical/"
});

console.log(currencyInfo);

let from = document.getElementById("from").value;
let to = document.getElementById("to").value;

function currencyChart() {
  currencyInfo
    .get(`close.json?start=${from}&end=${to}`)
    .then(response => {
      var ctx = document.getElementById("myChart").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: Object.keys(response.data.bpi),
          datasets: [
            {
              label: "Bitcoin Price Index",
              data: Object.values(response.data.bpi),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255,99,132,1)",
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
    })
    .catch(error => {
      console.log(error);
    });
}

currencyChart();

// document.getElementById("from").addEventListener("change", ()=>{
//     from = document.getElementById("from").value

// })

// function getValue ()
