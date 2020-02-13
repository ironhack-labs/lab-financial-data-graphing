const currency = "";
const functionName = "FX_DAILY";
const fromDAte = "";
const toDate = "";
const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json`;

axios
  .get(apiUrl)
  .then(responseFromAPI => {
      console.log( "The response from API: ",  responseFromAPI );
      printTheChart(responseFromAPI.data);   
    })
  .catch(err => console.log("Error while getting the data: ", err));

  function printTheChart(stockData) {

    const dailyData = stockData.bpi;
    const stockDates = Object.keys(dailyData);
    const stockPrices = stockDates.map( date => dailyData[date] );

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