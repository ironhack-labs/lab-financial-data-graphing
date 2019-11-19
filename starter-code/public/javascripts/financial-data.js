//Const
const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`

const dateFrom = document.querySelector("#dateFrom").value;
const dateTo = document.querySelector("#dateTo").value;
const currency = document.querySelector("#currency").value;


document.addEventListener()

//Axios
axios
.get(apiUrl)
.then(responseFromAPI => {
//   console.log(responseFromAPI.data);
  printTheChart(responseFromAPI.data);
})
.catch(err => {
  console.log("Error while getting the data: ", err);
});


//Charts

function printTheChart(stockData) {
    const dailyData = stockData["Time Series (Daily)"];
    const stockDates = Object.keys(dailyData);
    const stockPrices = stockDates.map(date => {
      return dailyData[date]["4. close"];
    });
    // debugger
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
            fill: false,
            data: stockPrices
          }
        ]
      }
    }); // closes chart = new Chart()
  } // closes printTheChart()




// chart.update();