const BITCOIN_API = `http://api.coindesk.com/v1/bpi/historical/close.json`;

let myChart; // global variable to be used to destroy the old chart before it updates to a new chart with newer dates

/* create the dates for the input fields */
let fromDate = new Date("2022-01-01").toISOString().split("T")[0]; //don't know what it is is doing but it converts the date to the ISO 8601 format, that somehow works with the input field. found this on stack overflow
let toDate = new Date().toISOString().split("T")[0];

/* event listener from date */
document.querySelector("#fromDate").addEventListener("change", (e) => {
  fromDate = new Date(e.target.value).toISOString().split("T")[0];
  updateBitcoinChart();
  console.log(`Hello from the fromDate Input`);
}); // the changing of dates is an event. use the value of the fromDate variable to be used in the input field

/* event listener to date */
document.querySelector("#toDate").addEventListener("change", (e) => {
  toDate = new Date(e.target.value).toISOString().split("T")[0];
  updateBitcoinChart();
  console.log(`Hello from the toDate Input`);
}); // the changing of dates is an event. use the value of the toDate variable to be used in the input field

/* connect to the bitcoin api */
function getBitcoinData(fromDate, toDate) {
  axios
    .get(`${BITCOIN_API}?start=${fromDate}&end=${toDate}`)
    .then((bitcoinInfo) => {
      console.log(bitcoinInfo);

      createBitcoinChart(bitcoinInfo.data.bpi); // call the createBitcoinChart function to give the parameter to the function itself to be used inside.
    })
    .catch((err) => {
      console.log(`Oopsie daisy, there went something wrong`, err);
    });
}

/* create the chart */
function createBitcoinChart(bitcoinInfo) {
  const ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Object.keys(bitcoinInfo),
      datasets: [
        {
          label: "Price Index Bitcoin",
          data: Object.values(bitcoinInfo),
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(153, 102, 255, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

/* update the chart */
function updateBitcoinChart() {
  myChart.destroy();
  getBitcoinData(fromDate, toDate);
}

/* call the bitcoin data function to show it */
getBitcoinData(fromDate, toDate);
