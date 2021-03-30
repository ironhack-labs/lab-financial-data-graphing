let bitCoinData;
let myLineChart;

let ctx = document.getElementById("myChart").getContext("2d");
let fromDate = document.getElementById("from-date");
let toDate = document.getElementById("to-date");
let currency = document.getElementById("currency");
let dateWarning = document.getElementById("date-warning");

const baseUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";

fromDate.addEventListener("change", updateChart);
toDate.addEventListener("change", updateChart);
currency.addEventListener("change", updateChart);

getRequest(baseUrl);

function getRequest(url) {
  axios
    .get(url)
    .then((response) => {
      return response.data.bpi;
    })
    .then((bitCoinData) => {
      drawChart(bitCoinData);
    })
    .catch((error) => {
      console.log(error);
    });
}

function drawChart(bitCoinData) {
  let bitCoinValue = Object.values(bitCoinData);
  let bitCoinDates = Object.keys(bitCoinData);
  myLineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: bitCoinDates,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: bitCoinValue,
        },
      ],
    },
  });
}

function updateChart() {
  let fromDateString = fromDate.value;
  let toDateString = toDate.value;
  let currencyString = currency.value;
  let requestUrl = `${baseUrl}?start=${fromDateString}&end=${toDateString}&currency=${currencyString}`;
  let requestUrlCurrencyOnly = `${baseUrl}?currency=${currencyString}`;
  if (fromDateString && toDateString && toDateString > fromDateString) {
    getRequest(requestUrl);
    dateWarning.innerHTML = "";
  } else {
    dateWarning.innerHTML = "Please enter valid From and To dates";
    getRequest(requestUrlCurrencyOnly);
  }
}
