const stockInfo = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json',
});

stockInfo.get()
  .then(function (response) {
    printChart(response.data)
  })
  .catch(function (error) {
    console.log(error);
  })

let printChart = ((stockData) => {
  console.log("DEBUG bpi", stockData.bpi)

  let stockDate = Object.keys(stockData.bpi)
  let stockPrice = Object.values(stockData.bpi);



  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockDate,
      datasets: [{
        label: '# of Votes',
        data: stockPrice,
      }]
    },
  });
});