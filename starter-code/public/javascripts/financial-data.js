
function pintarChart () {
    uno = document.getElementById("start").value;
    dos = document.getElementById("end").value;
    curr = document.getElementById("currency").value;
    
    const stockInfo = axios.create({
      baseURL: `https://api.coindesk.com/v1/bpi/historical/close.json?start=${uno}&end=${dos}&currency=${curr}`
    });


let stockTicket = "";

stockInfo
  .get(stockInfo.baseURL)
  .then(function(response) {
    console.log(response);
  
    let max = Math.max.apply(null, Object.values(response.data.bpi))
    let min = Math.min.apply(null, Object.values(response.data.bpi))
    console.log(max)
    console.log(min)

    console.log(Object.keys(response.data.bpi));
    console.log(Object.values(response.data.bpi));
    document.getElementById("maximo").innerHTML=max;
    document.getElementById("minimo").innerHTML=min

    printTheChart(response.data.bpi);

    
  })
  .catch(function(error) {
    console.log(error);
  });

let printTheChart = stockData => {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Object.keys(stockData),
      datasets: [{ data: Object.values(stockData) }]
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
};


}

pintarChart ()