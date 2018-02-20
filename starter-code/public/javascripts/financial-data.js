let pricesArray = [];
let datesArray = [];
const earliestDate = new Date("July 17, 2010 00:00:00")
let currentDate = new Date()
var ctx = document.getElementById("myChart").getContext('2d');
function getPricesInfo() {
    checkStart = new Date(document.getElementById("startDate").value);
    checkEnd = new Date(document.getElementById("endDate").value);
    if (checkStart>=earliestDate && checkEnd<currentDate && checkEnd>checkStart){
    let startDate = document.getElementById("startDate").value
    let endDate = document.getElementById("endDate").value
    let currency = document.getElementById("currency").value
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
    .then(response => {
      console.log(response.data)
        datesArray=Object.keys(response.data.bpi);
        pricesArray=Object.values(response.data.bpi);
        document.getElementById("minValue").setAttribute("value", Math.min.apply(Math, pricesArray))
        document.getElementById("maxValue").setAttribute("value", Math.max.apply(Math, pricesArray))
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: datesArray,
                datasets: [{
                    label: 'Price',
                    data: pricesArray,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)'
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
  }
  
  document.getElementById("cryptoButton").onclick = function(){
    getPricesInfo();
  }

  document.getElementById("startDate").onchange = function(){
    getPricesInfo();
  }

  document.getElementById("endDate").onchange = function(){
    getPricesInfo();
  }

  document.getElementById("currency").onchange = function(){
    getPricesInfo();
  }

  