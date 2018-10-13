
//const axios = require("axios")

let arrayDate = document.getElementsByTagName("input");
let to = document.getElementById("to");

arrayDate[0].onchange = getData;
arrayDate[1].onchange = getData;

//Peticion axios
function getData(e){
let toDate = e;
console.log(toDate)
  
axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=2018-08-01&end=2018-10-13`)
.then(res =>{
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
              label: '# of Votes',
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
                      beginAtZero:false
                  }
              }]
          }
      }
  });
}) 