const url = "http://api.coindesk.com/v1/bpi/historical/close.json";

const startDate = document.getElementById("from");
const endDate = document.getElementById("to");
const currencySelect = document.getElementById("currency");
const minVal = document.getElementById("minVal");
const maxVal = document.getElementById("maxVal");
let startDateInputValue;
let endDateInputValue;
let currencySelectValue;

startDate.onchange = (event) => {
  startDateInputValue = event.target.value;
  bitcoinPriceTracker();
};
endDate.onchange = (event) => {
  endDateInputValue = event.target.value;
  bitcoinPriceTracker();
};

currencySelect.onchange = (event) => {
  currencySelectValue = event.target.value;
  bitcoinPriceTracker();
};

function bitcoinPriceTracker() {
  if (!startDateInputValue || !endDateInputValue) {
    return;
  }
  getUpdatedValues();
}

function getUpdatedValues() {
  const currencyVal = currencySelectValue || "USD";
  axios
    .get(
      `${url}?currency=${currencyVal}&start=${startDateInputValue}&end=${endDateInputValue}`
    )
    .then((response) => {
      console.log("response:", response.data.bpi);
      const date = Object.keys(response.data.bpi);
      const value = Object.values(response.data.bpi);
      createChart(date, value);
      letsGetMathMin(data);
    });
}

axios
  .get(url)
  .then((response) => {
    console.log("response:", response);
    const date = Object.keys(response.data.bpi);
    const value = Object.values(response.data.bpi);
    createChart(date, value);
  })
  .catch((error) => {
    console.log(error);
  });

function letsGetMathMin(data) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  minVal.innerText = min;
  maxVal.innerText = max;
}

function createChart(x, y) {
  const ctx = document.getElementById("myChart");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: x,
      datasets: [
        {
          label: "Bitcoin price index",
          data: y,
          backgroundColor: "red",
          borderColor: "red",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
