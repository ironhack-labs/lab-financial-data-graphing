const stockInfo  = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
});


// const stock = "data";
var stockLabels = [];
var stockPrice = [];
// function getStockInfo(startDate, endDate) {
stockInfo.get()
.then( response => {
  // console.log(response);

  printTheChart(response.data);
    var key = '';
    var value = '';
    for ( [key, value] of Object.entries(response.data.bpi)) {
      stockLabels.push(key);
      stockPrice.push(value);
      // $('#stocky').append(`Date: ${key} | Price: ${value} <br>`);
    }

})
.catch(error => {
  console.log(error);
});


var printTheChart = (stockData) => {
  // const stockLabels = Object.keys( stockData);
  // const stockPrice = Object.values(  stockData);
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


document.getElementById("theButton").onclick = function(){
  const dateInput = document.getElementById("start").value;  
  const priceInput = document.getElementById("end").value;      
  console.log(dateInput);
  console.log(priceInput)
  // getCountryInfo(country);
}