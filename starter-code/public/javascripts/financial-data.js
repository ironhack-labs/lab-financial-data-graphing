// ITERATION 1 + 2
// axios.get("http://api.coindesk.com/v1/bpi/historical/close.json")
// .then(response => {
//   // console.log(response.data);
//   printTheChart(response.data);
// })
// .catch(err => {
//   console.log(err);
// })

const getData = () => {
  const startDate = document.getElementById('startDateInput').value;
  const endDate = document.getElementById('endDateInput').value;
  const currency = document.getElementById('currencySelect').value;
  const apiURL = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`;
  // const apiURL = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`;
  console.log(startDate, endDate);
  axios.get(apiURL)
    .then(response => {
    // console.log(response.data);
    printTheChart(response.data);
  })
    .catch(err => {
    console.log(err);
  })
}

function printTheChart(dataAPI) {
  const dailyData = dataAPI.bpi;

  const bitcoinDates = Object.keys(dailyData);
  const bitcoinPrices = bitcoinDates.map(date => {
    return dailyData[date];
  });

  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: bitcoinDates,
      datasets: [
        {
          label: "Stock Chart",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: bitcoinPrices
        }
      ]
    }
  });
}

getData();