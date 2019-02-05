const stockInfo = axios.create({
  baseURL: "https://api.coindesk.com/v1/bpi/historical/close.json"
});

const printTheChart = stockData => {
  const stockLabels = [];
  const stockPrice = [];
  for (var key in stockData) {
    stockLabels.push(key);
    stockPrice.push(stockData[key]);
  }

  //display value
  let maxValue = Math.max.apply(null,stockPrice)
  let minValue = Math.min.apply(null,stockPrice)
  document.getElementById('max-value').innerText = 'Max: '+maxValue+ ' '+ document.getElementById("currency-change").value
  document.getElementById('min-value').innerText = 'Min: '+minValue + ' '+ document.getElementById("currency-change").value 
  
  
  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockLabels,
      datasets: [
        {
          label: "Stock Chart",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: stockPrice
        }
      ]
    }
  });
};

stockInfo
  .get()
  .then(response => {
    console.log(response.data.bpi);
    printTheChart(response.data.bpi);
  })
  .catch(error => {
    console.log(error);
  });


//FILTER DATE
document.getElementById("date-to").onchange = function() {
  let dateFrom = document.getElementById("date-from").value;
  let dateTo = document.getElementById("date-to").value;

  axios
    .create()
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`
    )
    .then(response => {
      console.log(response.data.bpi);
      printTheChart(response.data.bpi);
    })
    .catch(error => {
      console.log(error);
    });
};


//CHANGE CURRENCY
document.getElementById("currency-change").onchange = function() {
  let currency = document.getElementById("currency-change").value;

  axios
    .create()
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`
    )
    .then(response => {
      printTheChart(response.data.bpi);
    })
    .catch(error => {
      console.log(error);
    });
};
