//const axios = require("axios")

let fromDate = document.getElementById("from");
let toDate = document.getElementById("to");

fromDate.valueAsDate = new Date();
toDate.valueAsDate = new Date();

var fromDateValue = "2018-10-01"
var toDateValue = "2018-10-13"


fromDate.onchange = function () {
  console.log(this.value);
  fromDateValue = this.value;
  getData()

}

toDate.onchange = function () {
  console.log(this.value);
  toDateValue = this.value;
  getData()

}

getData()
// arrayDate[0].onchange = getData;
// arrayDate[1].onchange = getData;


// console.log(to.onchange)

//Peticion axios
function getData() {
  // let toDate = e;
  // console.log(toDate.target.value)
  console.log(to.onchange)


  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDateValue}&end=${toDateValue}`)
    .then(res => {
      let labels = Object.keys(res.data.bpi)
      let values = Object.values(res.data.bpi)
      printChart(res.data, labels, values)
    })
}

let printChart = ((coinData, labels, values) => {
  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Bitcoins',
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      }
    }
  });
})