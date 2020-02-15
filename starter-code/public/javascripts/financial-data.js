let dateFromId = document.getElementById("date1");
let dateToId = document.getElementById("date2");
let currencyId = document.getElementById("currency");
let chart;


const mainChart = () => {
  let dateFrom = dateFromId.value;
  let dateTo = dateToId.value;
  let currency = currencyId.value;
  const restCoinDeskApi = axios.create({
    baseURL: `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}&currency=${currency}`
  })

  function getCoinDeskInfo(restCoinDeskApi) {
    restCoinDeskApi
    .get()
    .then(responseFromAPI => printTheChart(responseFromAPI.data))
    .catch(err => console.log("Error is: ", err));
  }

  // Print function
  function printTheChart(data) {
    const bpi = data["bpi"];

    const axisX = Object.keys(bpi);
    const axisY = axisX.map(e => bpi[e]);

    const ctx = document.getElementById("myChart").getContext("2d");
    // if (chart) chart.destroy();
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: axisX,
        datasets: [{
          label: "Data",
          backgroundColor: "#FF0000",
          borderColor: "rgb(255, 99, 132)",
          data: axisY
        }]
      }
    }); // closes chart = new Chart()

  } // closes printTheChart()

  getCoinDeskInfo(restCoinDeskApi);

}

//   document.getElementById("theButton").onclick = function() {
//     getCoinDeskInfo();
//   };

dateFromId.addEventListener("change", function () {
  chart.destroy();
  mainChart();
});

dateToId.addEventListener("change", function () {
  chart.destroy();
  mainChart();
});



mainChart();