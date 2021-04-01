const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";
const startDateInput = document.getElementById("start");
const endDateInput = document.getElementById("end");
const currencyInput = document.getElementById("currency");
let start;
let end;
let currency = currencyInput.value;

updateChart();

startDateInput.addEventListener("change", (event) => {
  start = event.target.value;
  getHistoricalData();
});

endDateInput.addEventListener("change", (event) => {
  end = event.target.value;
  getHistoricalData();
});

currencyInput.onChange = (event) => {
  currency = event.target.value;
  updateChart();
};

function getHistoricalData() {
  if (!end || !start) {
    return;
  }
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (endDate < startDate) {
    return;
  }

  axios
    .get(`${apiUrl}?start=${start}&end=${end}&currency=${currency}`)
    .then((response) => {
      const axisX = Object.keys(response.data.bpi);
      const axisY = Object.values(response.data.bpi);
      drawChart(axisX, axisY);
    });
}

function updateChart() {
  axios.get(`${apiUrl}?currency=${currency}`).then((response) => {
    const axisX = Object.keys(response.data.bpi);
    const axisY = Object.values(response.data.bpi);
    drawChart(axisX, axisY);
  });
}

function drawChart(labels, data) {
  const ctx = document.getElementById("myChart");
  let myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{ label: `Bitcoin Price Index`, data }],
    },
  });
}
