// A month from API
axios({
  method: "GET",
  url: "http://api.coindesk.com/v1/bpi/historical/close.json"
})
.then (res => {
  printTheChart(res.data.bpi);
  console.log(res.data.bpi);
})
.catch(error => {
  console.log(error);
})

const printTheChart = (stockData => {

    const stockLabels = Object.keys(stockData);
    const stockPrice = Object.values(stockData);
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data : {
        labels: stockLabels,
        datasets: [{
          label: "Bitcoin Chart",
          backgroundColor: 'rgb(255, 99,132)',
          borderColor: 'rgb(255,99,132)',
          data: stockPrice
        }]
      }
    });
  });


