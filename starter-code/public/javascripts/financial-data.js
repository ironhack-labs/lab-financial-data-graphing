const currency = "";
const functionName = "FX_DAILY";
let apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json`;
let dateFrom = '';
let dateTo = '';
let currSymb = '';

document.getElementById('update').addEventListener('click', () => {
  dateFrom = document.getElementById('date-from').value;
  dateTo = document.getElementById('date-to').value;
  currSymb = document.getElementById('currency-symbol').value;

  if ( dateFrom && dateTo && currSymb ) {
    apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currSymb}&start=${dateFrom}&end=${dateTo}`;
    callAxios();
  }
  else return;
})

function callAxios() {
  axios
    .get(apiUrl)
    .then(responseFromAPI => {
        printTheChart(responseFromAPI.data);

      })
    .catch(err => console.log("Error while getting the data: ", err));
  
    function printTheChart(stockData) {
  
      const dailyData = stockData.bpi;
      const stockDates = Object.keys(dailyData);
      const stockPrices = stockDates.map( date => dailyData[date] );
      const numArray = Object.values(stockPrices);
      const max = Math.max(...numArray);
      const min = Math.min(...numArray);
      document.getElementById('max').innerText = `Max: ${max}`
      document.getElementById('min').innerText = `Min: ${min}`
  
      const ctx = document.getElementById("myChart").getContext("2d");
      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: stockDates,
          datasets: [
            {
              label: "Bitcoin Price Index",
              backgroundColor: "rgba(137, 196, 244, 1)",
              borderColor: "rgba(1, 50, 67, 1)",
              data: stockPrices
            }
          ]
        }
    }); // closes chart = new Chart()
  } // closes printTheChart()
}

callAxios();
