axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05')
.then(response=>{
  console.log(response.data.bpi)
  printTheChart(response.data.bpi)
})
.catch(e => console.log(e))


let printTheChart = ((stockData) => {
  let stockLabels = Object.keys(stockData)
  let stockPrice = Object.values(stockData)
  let ctx = document.getElementById('canvas').getContext('2d');
  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockLabels,
      datasets: [{
        label: "Stock Chart",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: stockPrice,
      }]
    }
  });
});