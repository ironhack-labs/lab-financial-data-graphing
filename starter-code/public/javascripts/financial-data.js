/*jshint esversion: 6 */

const dataFromSelector = document.getElementById("dataFrom");
const dataToSelector = document.getElementById("dataTo");
const currencySelector = document.getElementById("currency");

let chart;

function printChartMain() {
  let fromDate = dataFromSelector.value;
  let toDate = dataToSelector.value;
  let currency = currencySelector.value;
  console.log(currency);
  const restCoinDeskApi = axios.create({
    baseURL: `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`
  });
  console.log(restCoinDeskApi);

  function getCoinDeskInfo(restCoinDeskApi) {
    restCoinDeskApi
      .get()
      .then(responseFromAPI => printTheChart(responseFromAPI.data))
      .catch(err => console.log("Error is: ", err));
  }

  function printTheChart(data) {
    console.log(fromDate);
    console.log(toDate);
    const bpi = data["bpi"];

    const xAxis = Object.keys(bpi); //get the keys
    console.log("EJE X " + xAxis);

    const yAxis = xAxis.map(e => bpi[e]); //get the values
    console.log("EJE Y " + yAxis);

    const ctx = document.getElementById("myChart").getContext("2d");
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: xAxis,
        datasets: [
          {
            label: "Data",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: yAxis
          }
        ]
      }
    }); // closes chart = new Chart()
  } // closes printTheChart()
  getCoinDeskInfo(restCoinDeskApi);
}

// document.getElementById("theButton").onclick = function() {
//   getCoinDeskInfo();
// };

dataFromSelector.addEventListener("change", function() {
  chart.destroy();
  printChartMain();
});

dataToSelector.addEventListener("change", function() {
  chart.destroy();
  printChartMain();
});

currencySelector.addEventListener("change", function() {
  chart.destroy();
  printChartMain();
});

printChartMain();
