const startDate = 'xxx';
const endDate = 'xxx';
const currencyType = 'xxx';

const currency = `?currency=${currencyType}`;
const period = `?start=${startDate}&end=${endDate}`;
const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";

axios
  .get(apiUrl)
  .then(responseFromAPI => {
    printTheChart(responseFromAPI.data);
    // console.log("The response from API: ", responseFromAPI);
  })
  .catch(err => {
    console.log("Error while getting the data: ", err);
  });

function printTheChart(coinData) {
  const dailyData = coinData.bpi;
  console.log(dailyData);

  const coinDates = Object.keys(dailyData)
  console.log(coinDates);

  const coinValues = coinDates.map((date) => dailyData[date])
  console.log(coinValues);

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
  document.getElementById("max-value").innerHTML = 'Max: ' + maxValue;

  document.getElementById("min-value").innerHTML = 'Min: ' + minValue;
} // closes printTheChart()