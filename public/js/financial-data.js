let myChart;
let fromDate = new Date("2022-01-01").toISOString().split("T")[0];
let toDate = new Date().toISOString().split("T")[0];

// Events
document.getElementById("fromDate").addEventListener("change", (e) => {
  fromDate = new Date(e.target.value).toISOString().split("T")[0];
  updateChart();
});

document.getElementById("toDate").addEventListener("change", (e) => {
  toDate = new Date(e.target.value).toISOString().split("T")[0];
  updateChart();
});

// Get Bitcoin Data
const getBitcoinInfo = (fromDate, toDate) => {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`
    )
    .then((bitcoinData) => {
      printChart(bitcoinData.data.bpi);
    })
    .catch((err) => console.log(err));
};

// Print Chart
const printChart = (bitcoinData) => {
  const ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Object.keys(bitcoinData),
      datasets: [
        {
          label: "Bitcoin Price Index",
          data: Object.values(bitcoinData),
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
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
};

// Update Chart
const updateChart = () => {
  myChart.destroy();
  getBitcoinInfo(fromDate, toDate);
};

// Get Default Chart
getBitcoinInfo(fromDate, toDate);
