const baseUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";

const currencyInput = document.getElementById("currency");
let currency = currencyInput.value;

const selectMaxValue = document.getElementById("maxValue");
const selectMinValue = document.getElementById("minValue");
const selectMaxCurrency = document.getElementById("maxCurrency");
const selectMinCurrency = document.getElementById("minCurrency");


//dates filter
//getting the start date 
let startDate;
const startingInput = document.getElementById("StartDate");
startingInput.addEventListener("input", (event) => {
  startDate = event.target.value;
  getHistoricalData();
});

//getting the end date
let endDate;
const endInput = document.getElementById("EndDate");
endInput.addEventListener("input", (event) => {
  endDate = event.target.value;
  getHistoricalData();
});

//getting the value of the currency
currencyInput.onchange = (event) => {
  currency = event.target.value;
  bitcoinPriceTracker();
};

//function for date filter
function getHistoricalData() {
  //both dates, end and start, are needed to proceed with the request
  if (!endDate || !startDate) {
    return;
  }
  //start date must be lower than end date
  const start = new Date (startDate);
  const end = new Date (endDate);
  if (end < start) {
    return;
  }
  axios.get(`${baseUrl}?start=${startDate}&end=${endDate}`).then((response2) => {
    const labels = Object.keys(response2.data.bpi);
    const data = Object.values(response2.data.bpi);
    drawChart(labels, data);
  });
}

//function to request the values with the currency selected
function bitcoinPriceTracker() {
  axios.get(`${baseUrl}?currency=${currency}`).then((axiosResponse) => {
    const labels = Object.keys(axiosResponse.data.bpi);
    const data = Object.values(axiosResponse.data.bpi);
    maxAndMinValues(data, currency);
    drawChart(labels, data);
  });
}

//default request
axios
  .get(baseUrl)
  .then((response) => {
    const labels = Object.keys(response.data.bpi);
    const data = Object.values(response.data.bpi);
    drawChart(labels, data);
  })
  .catch((err) => {
    console.log("err:", err.message);
  });

  //function to draw the chart with the values selected
function drawChart(labels, data) {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
        },
      ],
    },
  });
}

//function to show the max/min values and adding the currency
function maxAndMinValues(data, currency) {

  const maxValue = Math.max.apply(null, data);
  selectMaxValue.innerText = maxValue;
  selectMaxCurrency.innerText = currency;

  const minValue = Math.min.apply(null, data);
  selectMinValue.innerText = minValue;
  selectMinCurrency.innerText = currency;
}

//calling the currency function
bitcoinPriceTracker();