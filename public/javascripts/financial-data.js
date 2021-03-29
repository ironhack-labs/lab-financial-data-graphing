const fromDate = document.getElementById("from-date");
const toDate = document.getElementById("to-date");
//const log = document.getElementById("values");
const actionButton = document.getElementById("action-button");
let historyDates = [];
let historyPrices = [];

//function getDefaultData() {
axios
  .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
  .then((response) => {
    console.log("***response: ", response.data.bpi);
    let retrievedData = response.data.bpi;
    historyDates = Object.keys(retrievedData);
    historyPrices = Object.values(retrievedData);
    //drawChart(historyDates, historyPrices);
  })
  .catch((err) => console.log("error****", err));
//}

function getRangedData(fromDateValue, toDateValue) {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDateValue}&end=${toDateValue}`
    )
    .then((response) => {
      console.log("***response: ", response.data.bpi);
      // let retrievedData = response.data.bpi;
      // historyDates = Object.keys(retrievedData);
      // historyPrices = Object.values(retrievedData);
      // drawChart(historyDates, historyPrices);
    })
    .catch((err) => console.log("error****", err));
}

// function drawChart(historyDates, historyPrices) {
//   var ctx = document.getElementById("myChart").getContext("2d");
//   var chart = new Chart(ctx, {
//     type: "line",
//     data: {
//       labels: historyDates,
//       datasets: [
//         {
//           label: "Historical BPI",
//           backgroundColor: "rgb(255,215,0)",
//           borderColor: "rgb(5, 128, 56)",
//           data: historyPrices,
//         },
//       ],
//     },
//     options: {},
//   });

//   actionButton.addEventListener("click", () => {
//     console.log(fromDateValue, toDateValue);
//     getRangedData(fromDateValue, toDateValue);
//   });
// }
// drawChart();

actionButton.addEventListener("click", () => {
  console.log("working");
  //console.log(fromDate.value, toDate.value);
  const fromDateValue = fromDate.value;
  const toDateValue = toDate.value;
  console.log(fromDateValue, toDateValue);
  getRangedData(fromDateValue, toDateValue);
  return;
  //console.log(fromDateValue, toDateValue);
  //getRangedData(fromDateValue, toDateValue);
});
