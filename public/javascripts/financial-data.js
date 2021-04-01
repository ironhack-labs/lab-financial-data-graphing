const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";
const startDateInput = document.getElementById("start");
const endDateInput = document.getElementById("end");
const currencyInput = document.getElementById("currency");
const minValueInput = document.getElementById("min");
const maxValueInput = document.getElementById("max");
let start;
let end;
let currency = currencyInput.value;

updateChart(`${apiUrl}?currency=${currency}`);

startDateInput.addEventListener("change", (event) => {
  start = event.target.value;
  getHistoricalData();
});

endDateInput.addEventListener("change", (event) => {
  end = event.target.value;
  getHistoricalData();
});

currencyInput.addEventListener("change", (event) => {
  currency = event.target.value;
  if (!end && !start) {
    updateChart(`${apiUrl}?currency=${currency}`);
  } else {
    updateChart(`${apiUrl}?start=${start}&end=${end}&currency=${currency}`);
  }
});

function getHistoricalData() {
  if (!end || !start) {
    return;
  }
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (endDate < startDate) {
    return;
  }
  updateChart(`${apiUrl}?start=${start}&end=${end}&currency=${currency}`);
}

function updateChart(url) {
  axios.get(url).then((response) => {
    const axisX = Object.keys(response.data.bpi);
    const axisY = Object.values(response.data.bpi);
    drawChart(axisX, axisY);
    const minValue = Math.min(...axisY);
    const maxValue = Math.max(...axisY);
    minValueInput.innerText = `${minValue} ${currency}`;
    maxValueInput.innerText = `${maxValue} ${currency}`;
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
