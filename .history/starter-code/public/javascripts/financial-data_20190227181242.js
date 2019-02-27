// const stockInfo  = axios.create({
//   baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
// });
var stockLabels = [];
var stockPrice = [];

// const stock = "data";
const getStockCoin = (start, end) => {
  axios({
    method: "get",
    url: `http://api.coindesk.com/v1/bpi/historical/close.json` 
  })
  .then( response => {

      var key = '';
      var value = '';
      for ( [key, value] of Object.entries(response.data.bpi)) {
        stockLabels.push(key);
        stockPrice.push(value);
        // $('#stocky').append(`Date: ${key} | Price: ${value} <br>`);
      }
      createCoinList(stockLabels, stockPrice );
      printTheChart();
  
  })
  .catch(error => {
    console.log(error);
  });
}

// function getStockInfo(startDate, endDate) {
// stockInfo.get()
// .then( response => {
//   // console.log(response);

//   printTheChart(response.data);
//     var key = '';
//     var value = '';
//     for ( [key, value] of Object.entries(response.data.bpi)) {
//       stockLabels.push(key);
//       stockPrice.push(value);
//       // $('#stocky').append(`Date: ${key} | Price: ${value} <br>`);
//     }

// })
// .catch(error => {
//   console.log(error);
// });

const createCoinList = (keyArray, valArray) => {
  let htmlList = "";
  for(let i = 0 ; i < keyArray.length; i ++) {
      htmlList += `Date: ${keyArray[i]} | Price:${valArray[i]} `
  }
  document.getElementById("ul").innerHTML = htmlList;
}


var printTheChart = (stockData) => {
  const ctx = document.getElementById('myChart').getContext('2d');


var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    // The data for our dataset
    data: {
        labels: stockLabels,
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: stockPrice,
        }]
    }
});
};

getStockCoin();


document.getElementById("theButton").onclick = function(e){
  e.preventDefault();
  let start = document.getElementById("start").value;
  let end = document.getElementById("end").value;
  getStockCoin(start, end);
}