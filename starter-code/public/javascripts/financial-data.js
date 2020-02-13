let chart;

// get request with Axios
function getCoinInfo(start, end, currency, cb) {
  axios
    .get("http://api.coindesk.com/v1/bpi/historical/close.json", {
      params: {
        start,
        end,
        currency
      }
    })
    .then(responseFromAPI => {
      const dailyData = responseFromAPI.data["bpi"];
      const dates = Object.keys(dailyData);
      const coinValues = dates.map(date => dailyData[date]);
      updateMaxMin(Math.min(...coinValues), Math.max(...coinValues));
      cb(dates, coinValues);
    })
    .catch(e => console.log(e));
}

// print chart
function printTheChart(label, data) {
  Chart.defaults.global.defaultFontColor = "rgb(169, 169, 169)";
  const ctx = document.getElementById("coinChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: label,
      datasets: [
        {
          label: "Bitcoin Price Index",
          backgroundColor: "rgba(30, 144, 255, 0.5)",
          borderColor: "rgb(30, 144, 255)",
          data: data
        }
      ]
    }
  });
}

// update chart values
function updateChart(label, data) {
  chart.data.labels = label;
  chart.data.datasets.forEach(dataset => {
    dataset.data = data;
  });
  chart.update();
}

// get dates values and refresh the chart
const inputs = document.querySelectorAll(".input");
const dateFrom = document.querySelector("#dateFrom");
const dateTo = document.querySelector("#dateTo");
inputs.forEach(input => {
  input.addEventListener("input", event => {
    // api request and call the update function
    if (dateFrom.value && dateTo.value)
      getCoinInfo(dateFrom.value, dateTo.value, currency.value, updateChart);
    else getCoinInfo(null, null, currency.value, updateChart);
  });
});

function updateMaxMin(min, max) {
  const minSpan = document.querySelector("#min");
  const maxSpan = document.querySelector("#max");
  minSpan.innerHTML = min;
  maxSpan.innerHTML = max;
}

getCoinInfo(null, null, "USD", printTheChart); // api request and print the chart the first time
