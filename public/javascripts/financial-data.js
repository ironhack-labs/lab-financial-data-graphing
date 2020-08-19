/**
 *  requests the server for Bit Coins data
 */
function requestDataFromServer(url) {
  axios
    .get(url)
    .then((response) => {
      // console.log(response.data);
      drawChart(response.data.bpi);
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * draws the BitCoins chart
 * @param {*} bitCoinData
 */
function drawChart(bitCoinData) {
  var ctx = document.getElementById("my-chart").getContext("2d");

  const coinDeskDates = Object.keys(bitCoinData);
  const coinDeskPrices = coinDeskDates.map((date) => bitCoinData[date]);

  // console.log(coinDeskDates);
  console.log(coinDeskPrices);

  // console.log(Math.min(...coinDeskPrices));

  let myLineChart = new Chart(ctx, {
    type: "line",
    title: {
      text: "Bit COins Chart",
    },
    data: {
      labels: coinDeskDates,
      datasets: [
        {
          label: "Bit Coin Chart",
          //   backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: coinDeskPrices,
        },
      ],
    },
  });

  // Update min and max
  document.getElementById("min").innerHTML = Math.min(...coinDeskPrices);
  document.getElementById("max").innerHTML = Math.max(...coinDeskPrices);

  Array.from(document.getElementsByClassName("curr")).forEach((element) => {
    element.innerHTML = " " + document.getElementById("currency").value;
  });
}

/**
 * Event  listener to   from-date
 */
document.getElementById("from-date").addEventListener("change", () => {
  getDatesCoinsData();
});

/**
 * Event  listener to   to-date
 */
document.getElementById("to-date").addEventListener("change", () => {
  getDatesCoinsData();
});

/**
 * Event  listener to  country currency
 */
document.getElementById("currency").addEventListener("change", () => {
  const choosedCurrency = document.getElementById("currency").value;
  console.log(choosedCurrency);
  const reqUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${choosedCurrency}`;
  console.log(reqUrl);
  requestDataFromServer(reqUrl);
});

/**
 * updates the chart with start and end dates
 */
function getDatesCoinsData() {
  const fromDate = document.getElementById("from-date").value;
  const toDate = document.getElementById("to-date").value;
  if (fromDate > toDate) {
    alert("from date shouldn't greater than To date");
  }

  let reqUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`;
  console.log(reqUrl);
  requestDataFromServer(reqUrl);
}

requestDataFromServer("http://api.coindesk.com/v1/bpi/historical/close.json");
