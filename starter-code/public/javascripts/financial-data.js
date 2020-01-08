
// const currency = `?currency=${currencyType}`;
// const period = `?start=${startDate}&end=${endDate}`;

const bitcoinApi = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
});

bitcoinApi
  .get()
  .then(responseFromAPI => {
    printTheChart(responseFromAPI.data);
    // console.log("The response from API: ", responseFromAPI);
  })
  .catch(err => {
    console.log("Error while getting the data: ", err);
  });

function printTheChart(coinData) {
  const dailyData = coinData.bpi;
  // console.log(dailyData);

  const coinDates = Object.keys(dailyData)
  // console.log(coinDates);

  const coinValues = coinDates.map((date) => dailyData[date])
  // console.log(coinValues);

  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: coinDates,
      datasets: [{
        label: "Bit Coins Chart",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: coinValues
      }]
    }
  }); // closes chart = new Chart()

  const maxValue = Math.max(...coinValues);
  const minValue = Math.min(...coinValues);
  const money = document.getElementById('currency').value;
  document.getElementById("max-value").innerHTML = 'Max: ' + maxValue + ' ' + money;

  document.getElementById("min-value").innerHTML = 'Min: ' + minValue + ' ' + money;
} // closes printTheChart()

function getPeriodData(start, end) {
  const period = `?start=${start}&end=${end}`;
  console.log(period);
  // bitcoinApi
  axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json" + period)
  .then(responseFromAPI => {
    printTheChart(responseFromAPI.data);
    // console.log("The response from API: ", responseFromAPI);
  })
  .catch(err => {
    console.log("Error while getting the data: ", err);
  });
}


function getCurrencyData(selectedCurrency) {
  const currency = `?currency=${selectedCurrency}`;
  // console.log(currency);
  // bitcoinApi
  axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json" + currency)
  .then(responseFromAPI => {
    printTheChart(responseFromAPI.data);
    // console.log("The response from API: ", responseFromAPI);
  })
  .catch(err => {
    console.log("Error while getting the data: ", err);
  });
}

document.getElementsByClassName('period-dates').onchange = function() {
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  getPeriodData(startDate, endDate);
};

document.getElementById('currency').onchange = function() {
  const currencyType = document.getElementById('currency').value;
  getCurrencyData(currencyType);
};