// Iteration 1:
const BITCOIN_API = "http://api.coindesk.com/v1/bpi/historical/close.json";

// Iteration 3: functions to change the dates:
const startDate = document.querySelector("#fromDate");
const endDate = document.querySelector("#toDate");

startDate.addEventListener("change", () => {
  fromDate = startDate.value;
  console.log(`Here is the startdate:`, fromDate);
  updatedChart();
});

endDate.addEventListener("change", () => {
  toDate = endDate.value;
  console.log(`Here is the end date:`, toDate);
  updatedChart();
});

updatedChart();

function createChart(bitcoinYAxis, bitcoinXAxis) {
  let ctx = document.getElementById("myChart");
  ctx = new Chart(ctx, {
    type: "line",
    data: {
      label: bitcoinYAxis,
      datasets: [
        {
          label: "Bitcoin Price indexes",
          backgroundColor: "rgb(153, 102, 255)",
          borderColor: "rgb(54, 162, 235)",
          data: bitcoinXAxis,
        },
      ],
    },
  });
}

function updatedChart() {
  axios
    .get(`${BITCOIN_API}`)
    .then((bitcoin) => {
      console.log(bitcoin);
      console.log("DATE:", Object.keys(bitcoin.data.bpi));
      console.log("Values:", Object.values(bitcoin.data.bpi));

      const dates = Object.keys(bitcoin.data.bpi);
      const values = Object.values(bitcoin.data.bpi);

      createChart(dates, values);
    })
    .catch((err) => {
      console.log(err);
    });
}
