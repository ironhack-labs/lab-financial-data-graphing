const BITCOIN_API = `http://api.coindesk.com/v1/bpi/historical/close.json`;
let myChart;

function getBitcoinData() {
  axios
    .get(`${BITCOIN_API}`)
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
      // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"], // add the date of the bitcoin api
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"], // add the date of the bitcoin api
      datasets: [
        {
          label: "Price Index Bitcoin",
          data: [12, 19, 3, 5, 2, 3], // add the data of the bitcoin api
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

getBitcoinData();

// getBitcoinData();
// // Iteration 1:
// const BITCOIN_API = "http://api.coindesk.com/v1/bpi/historical/close.json";

// // Iteration 3: functions to change the dates:
// const startDate = document.querySelector("#fromDate");
// const endDate = document.querySelector("#toDate");

// startDate.addEventListener("change", () => {
//   fromDate = startDate.value;
//   console.log(`Here is the startdate:`, fromDate);
//   updatedChart();
// });

// endDate.addEventListener("change", () => {
//   toDate = endDate.value;
//   console.log(`Here is the end date:`, toDate);
//   updatedChart();
// });

// updatedChart();

// function createChart(bitcoinYAxis, bitcoinXAxis) {
//   let ctx = document.getElementById("myChart");
//   ctx = new Chart(ctx, {
//     type: "line",
//     data: {
//       label: bitcoinYAxis,
//       datasets: [
//         {
//           label: "Bitcoin Price indexes",
//           backgroundColor: "rgb(153, 102, 255)",
//           borderColor: "rgb(54, 162, 235)",
//           data: bitcoinXAxis,
//         },
//       ],
//     },
//   });
// }

// function updatedChart() {
//   axios
//     .get(`${BITCOIN_API}`)
//     .then((bitcoin) => {
//       const dates = bitcoin.data.bpi;
//       const values = bitcoin.data.bpi;

//       createChart(dates, values);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
