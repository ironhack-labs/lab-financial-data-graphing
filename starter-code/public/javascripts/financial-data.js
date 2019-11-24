const key = "demo";
const functionName = "TIME_SERIES_DAILY";
const symbolName = "MSFT";
const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`;
let dateinicio;
let datefin;

axios
  .get(apiUrl)
  .then(responseFromAPI => {
    printTheChart(responseFromAPI.data); 
    console.log("The response from API: ", responseFromAPI);
  })
  .catch(err => {
    console.log("Error while getting the data: ", err);
  });

function printTheChart(stockData) {
  const apibpi = stockData["bpi"];
console.log(stockData["bpi"])

  const stockDates = Object.keys(apibpi);
  const stockPrices = stockDates.map(date => {
    return apibpi[date];
  });

  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockDates,
      datasets: [
        {
          label: "Bitcoin",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: stockPrices
        }
      ]
    }
  }); 
} 



  



  
