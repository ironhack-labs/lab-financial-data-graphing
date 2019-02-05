function callBitCoin(finit, fend){
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${finit}&end=${fend}`)
    .then(response => {
      printTheChart(response.data.bpi);
    })
    .catch(err => {
      console.log(err)
    })
}

callBitCoin("2019-01-05", "2019-02-04")

const printTheChart = (stockData => {
  const stockLabels = Object.keys(stockData)
  const stockPrice = Object.values(stockData)
  
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockLabels,
      datasets: [{
        label: "Stock Chart",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: stockPrice
      }]
    }
  });
});

window.onload = ()=>{

    document.getElementById('init').addEventListener("change", function(e){
        var finit = document.getElementById("init").value;
        var fend = document.getElementById("finish").value;
        console.log(finit)
        callBitCoin(finit, fend)
    })

    document.getElementById('finish').addEventListener("change", function(e){
        var finit = document.getElementById("init").value;
        var fend = document.getElementById("finish").value;
        console.log(finit)
        callBitCoin(finit, fend)
    })
}
