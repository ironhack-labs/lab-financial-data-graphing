const apiURL = `http://api.coindesk.com/v1/bpi/historical/close.json`;
const fromDate = document.getElementById("from-date");
const toDate = document.getElementById("to-date");
const actionButton = document.getElementById("action-button");
let historyDates = [];
let historyPrices = [];
let fromDateValue;
let toDateValue;

fromDate.addEventListener("change", (event) => {
  fromDateValue = event.target.value;
  getRangedData();
});

toDate.addEventListener("change", (event) => {
  toDateValue = event.target.value;
  getRangedData();
});

function getDefaultData() {
  axios
    .get(apiURL)
    .then((response) => {
      let retrievedData = response.data.bpi;
      historyDates = Object.keys(retrievedData);
      historyPrices = Object.values(retrievedData);
      drawChart(historyDates, historyPrices, "rgb(5, 128, 56)");
    })
    .catch((err) => console.log("axios error****", err));
}
getDefaultData();

function getRangedData() {
  if (!fromDateValue || !toDateValue) {
    return;
  }
  axios
    .get(`${apiURL}?start=${fromDateValue}&end=${toDateValue}`)
    .then((response) => {
      let retrievedData = response.data.bpi;
      historyDates = Object.keys(retrievedData);
      historyPrices = Object.values(retrievedData);
      drawChart(historyDates, historyPrices, "rgb(3, 19, 252)");
    })
    .catch((err) => console.log("error****", err));
}

function drawChart(historyDates, historyPrices, color) {
  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: historyDates,
      datasets: [
        {
          label: "Historical BPI",
          backgroundColor: "rgb(255,215,0)",
          borderColor: color,
          data: historyPrices,
        },
      ],
    },
    options: {},
  });
}
