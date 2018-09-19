var priceArr = [];
var dateArr  = [];

function getInfoCoin() {
  var startDate = document.getElementById("startDate").value;
  var endDate  = document.getElementById("endDate").value;
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)//change dates
  .then(response => {
    dateArr = Object.keys(response.data.bpi)
    priceArr = Object.values(response.data.bpi)//bpi??

    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
       data: {
           labels: dateArr,
           datasets: [{
               label: "price",
               data: priceArr,
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
                       beginAtZero:true
                   }
               }]
           }
       }
   });
   
  })
  .catch(err => {
    console.error(err)
  })
}

document.getElementById("pButton").onclick = function(){
 getInfoCoin();
}
