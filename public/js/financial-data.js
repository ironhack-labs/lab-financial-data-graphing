const BITCOIN_API = `http://api.coindesk.com/v1/bpi/historical/close.json`;

let myChart;
let fromDate = new Date("2022-01-01").toISOString().split("T")[0];
let toDate = new Date().toISOString().split("T")[0];

/*Event listener from date */
document.querySelector("#fromDate").addEventListener("change", (e) => {
  fromDate = new Date(e.target.value).toISOString().split("T")[0];
  updateBitcoinChart();
  console.log(`Hello from the fromDate Input`);
});

/*Event listener to date */
document.querySelector("#toDate").addEventListener("change", (e) => {
  toDate = new Date(e.target.value).toISOString().split("T")[0];
  updateBitcoinChart();
  console.log(`Hello from the toDate Input`);
});

function getBitcoinData(fromDate, toDate) {
  axios
    .get(`${BITCOIN_API}?start=${fromDate}&end=${toDate}`)
    .then((bitcoinInfo) => {
      console.log(bitcoinInfo);

      createBitcoinChart(bitcoinInfo.data.bpi);
    })
    .catch((err) => {
      console.log(`Oopsie daisy, there went something wrong`, err);
    });
}

function createBitcoinChart(bitcoinInfo) {
  const ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Object.keys(bitcoinInfo), // add the date of the bitcoin api
      datasets: [
        {
          label: "Price Index Bitcoin",
          data: Object.values(bitcoinInfo), // add the data of the bitcoin api
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

function updateBitcoinChart() {
  myChart.destroy();
  getBitcoinData(fromDate, toDate);
}

getBitcoinData(fromDate, toDate);
