const stockInfo = axios.create({
  baseURL: 'https://api.coindesk.com/v1/bpi/historical/close.json',
});

const printTheChart = (stockData => {
  const stockLabels = []
  const stockPrice =[]
  for (var key in stockData) {
   
    stockLabels.push(key)
    stockPrice.push(stockData[key])
  }
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
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

stockInfo.get()
  .then(response => {
    console.log(response.data.bpi)
    printTheChart(response.data.bpi);
  })
  .catch(error => {
    console.log(error);
  });

 function changeDate(){
  let dateFrom = document.getElementById('date-from').value 
  let dateTo = document.getElementById('date-to').value 

 
 axios.create().get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`)
  .then(response => {
    console.log(response.data.bpi)
    printTheChart(response.data.bpi);
  })
  .catch(error => {
    console.log(error);
  });

}
