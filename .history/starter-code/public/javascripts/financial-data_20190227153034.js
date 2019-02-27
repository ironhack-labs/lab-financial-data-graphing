const stockInfo  = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
});


// const stock = "data";

// function getStockInfo(startDate, endDate) {
stockInfo.get()
.then(response => {
  // console.log(response);

  // printTheChart(response.data);
    var key = '';
    var value = '';
    for ( [key, value] of Object.entries(response.data.bpi)) {
      // console.log(key);
      // $('#stocky').append(`Date: ${key} | Price: ${value} <br>`);
    }

})
.catch(error => {
  console.log(error);
});


var printTheChart = (stockData => {
  const stockLabels = stockData.map( element => element.key);
  const stockPrice = stockData.map( element => element.value);
  const ctx = document.getElementById('myChart').getContext('2d');

  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',
  
      // The data for our dataset
      data: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [{
              label: "My First dataset",
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: [0, 10, 5, 2, 20, 30, 45],
          }]
      },
  
      // Configuration options go here
      options: {}
  });
 chart();
});