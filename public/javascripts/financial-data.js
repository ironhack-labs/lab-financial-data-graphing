const url = "http://api.coindesk.com/v1/bpi/historical/close.json";
const startInput = document.getElementById("start");
const endInput = document.getElementById("end");
const currencyInput = document.getElementById("currency");
let start;
let end;
let currency = currencyInput.value;

startInput.onchange = (event) => {
  start - event.target.value;
  getHistoricalData();
};
endInput.onchange = (event) => {
  end = event.target.value;
  getHistoricalData();
};
currencyInput.onchange = (event) => {
  currency = event.target.value;
  getCurrencyData();
};
function getCurrencyData() {
  axios.get(`${url}?start=${start}&end=${end}`).then((response3) => {
    const labels = Object.keys(response3.data.bpi);
    const data = Object.values(response3.data.bpi);
    drawChart(labels, data);
  });
}

function getHistoricalData() {
  if (!end || !start) {
    return;
  }
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (endDate < startDate) {
    return "Go Home drunker";
  }
  axios.get(`${url}?start=${start}&end=${end}`).then((response2) => {
    const labels = Object.keys(response2.data.bpi);
    const data = Object.values(response2.data.bpi);
    drawChart(labels, data);
  });
}

axios.get(url).then((response) => {
  console.log(response);
  const labels = Object.keys(response.data.bpi);
  const data = Object.values(response.data.bpi);
  drawChart(labels, data);
});
function drawChart(labels, data) {
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Bitcoin Prices",
          data,
        },
      ],
    },
  });
}
