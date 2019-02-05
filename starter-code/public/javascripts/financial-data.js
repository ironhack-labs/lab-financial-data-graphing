
axios.get("http://api.coindesk.com/v1/bpi/historical/close.json")
.then(response => {
  printTheChart(response.data.bpi);
})
.catch(err => {
  console.log(err)
})


const printTheChart = (stockData => {
  const stockLabels = Object.keys(stockData)
  console.log(stockLabels)
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