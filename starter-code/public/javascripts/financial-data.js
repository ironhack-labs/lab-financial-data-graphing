const hashCoin = axios.create(
  {
    baseURL:"http://api.coindesk.com/v1/bpi/historical/close.json"
  }
)

var ctx = document.getElementById('myChart').getContext('2d');
var chartView ={
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [],//x
        datasets: [{
            label: 'NUMEROS DE FRACASSO',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: []//y
        }]
    },

    // Configuration options go here
    options: {}
};

function as(n)
{
    n.forEach((e) => {
        chartView.data.datasets[0].data.push(e)
    })
}

function sa(n)
{
    n.forEach((e) => {
        chartView.data.labels.push(e)
    })
}

hashCoin.get("123").then( responseFromAPI => {
    as(Object.values(responseFromAPI.data.bpi))
    sa(Object.keys(responseFromAPI.data.bpi))
    var chart = new Chart(ctx, chartView );
} 
).catch((e) => console.log(e))

function getCoinInfo(theName) {
    hashCoin
      .get(theName)
      .then(responseFromAPI => { 
        })
      .catch(err => console.log("Error is: ", err));
  }
  
  document.getElementById("trap").onclick = function() {
    const coin = document.getElementById("bit").value;
    getCoinInfo(coin);
  };