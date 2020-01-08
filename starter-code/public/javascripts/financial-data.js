
//Axios Create
const coinDeskApi = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
});

//Axios GET request

coinDeskApi
  .get()
  .then(responseFromAPI => {
    const { data } = responseFromAPI;
    console.log(data.bpi)
    printTheChart(data.bpi); // <== call the function here where you used to console.log() the response
  })
  .catch(err => {
    console.log("Error while getting the data: ", err);
  });

//Print Chart Function Called in our Axios GET request
function printTheChart(stockData) {
  const stockDates = Object.keys(stockData);
  const stockPrices = Object.values(stockData);
  
  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockDates,
      datasets: [
        {
          label: "Stock Chart",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: stockPrices
        }
      ]
    }
  }); // closes chart = new Chart()
  // closes printTheChart()
};  
