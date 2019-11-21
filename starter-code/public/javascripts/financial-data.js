const key = "demo";
const functionName = "TIME_SERIES_DAILY";
const symbolName = "MSFT";
let inicio = '2012-01-07'
let fin = '2019-11-20'

getData(inicio, fin);

function getData(startDate, endDate) {
  const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;
  axios
    .get(apiUrl)
    .then(responseFromAPI => {
      console.log("The response from API: ", responseFromAPI);
      printTheChart(responseFromAPI.data); // <== call the function here where you used to console.log() the response

      
    })
    .catch(err => {
      console.log("Error while getting the data: ", err);
    });
}


function printTheChart(stockData) {

  const dailyData = stockData["bpi"];

  console.log(stockData["bpi"])
  
  const stockDates = Object.keys(dailyData);
  const stockPrices = stockDates.map(date => {
    return dailyData[date];
  });

  
  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockDates,
      datasets: [
        {
          label: "Bitcoin Price Index",
          backgroundColor: "rgb(176(, 173, 172)",
          borderColor: "rgb(255, 99, 132)",
          data: stockPrices
        }
      ]
    }
  }); // closes chart = new Chart()
} // closes printTheChart()



const dateInicio = document.getElementById("start").onchange = (e) => {
  inicio = e.target.value
  getData(inicio, fin);
};

const dateFin = document.getElementById("end").onchange = (e) => {
  fin = e.target.value
  getData(inicio, fin);
};