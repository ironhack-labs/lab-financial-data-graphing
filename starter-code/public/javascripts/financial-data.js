
function setChart(dateStart,dateFinish){

  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=EUR&start=${dateStart}&end=${dateFinish}`)
.then((datos)=>{

const dataBitcoin = datos.data.bpi
const arrayDate = []
const arrayBitcoin = []

for (const prop in dataBitcoin) {
 arrayDate.push(prop)
 arrayBitcoin.push(dataBitcoin[prop])

}

var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
 type: 'line',
 data: {
     labels: arrayDate,
     datasets: [{
         label: 'Price of bitcoin',
         data: arrayBitcoin,
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

}


setChart("2018-01-01","2018-01-31")


window.onload = ()=>{

  let date1 = document.getElementById("date1")
  let date2 = document.getElementById("date2")
  var tobias1 = "2018-01-01"
  var tobias2 = "2018-01-31"

  date1.onchange = (e)=>{

    tobias1 = e.target.value
    console.log(tobias1 + " " + tobias2)
    setChart(tobias1.toString(),tobias2)
  }


  date2.onchange = (a)=>{

    tobias2 = a.target.value
    setChart(tobias1,tobias2.toString())
  }

 }



