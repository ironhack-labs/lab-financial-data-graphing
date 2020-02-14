let axiosInstance, ctx, chart;
const dateFrom = document.getElementById("from-input");
const dateTo = document.getElementById("to-input");
const currency = document.getElementById("currency-input");

window.onload = () => {
  ctx = document.getElementById("financial-chart").getContext("2d");
  axiosInstance = axios.create({
    baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
  });

  requestAPI(null, null, null, loadChart);
};

async function requestAPI(start, end, currency, fn) {
  try {
    console.log(start)
    console.log(end)
    const response = await axiosInstance.get("", { params: { start, end, currency } });
    const keys = Object.keys(response.data.bpi);
    const values = keys.map(k => response.data.bpi[k]);
    putExtremPoints(Math.min(...values), Math.max(...values))
    fn(keys, values);
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

function loadChart(labels, data) {
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Bitcoin Price",
          data: data,
          backgroundColor: "rgba(28,55,92, 0.4)",
          borderColor: "rgba(28,55,92)",
          borderWidth: 2
        }
      ]
    }
  });
}

function updateChart(labels, data) {
  chart.data.labels = labels;
  chart.data.datasets[0].data = data;
  chart.update();
}

function putExtremPoints(min, max) {
  document.getElementById("min-val").innerHTML = min;
  document.getElementById("max-val").innerHTML = max;
}

function listeners() {
  console.log("hola")
  if (dateTo.value && dateFrom.value) requestAPI(dateFrom.value, dateTo.value, currency.value, updateChart) 
  else requestAPI(null, null, currency.value, updateChart) 
}
