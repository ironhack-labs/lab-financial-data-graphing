/**
 *
 */
function requestDataFromServer(url) {
  // const requestDataFromServer = "http://api.coindesk.com/v1/bpi/historical/close.json";
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
 *
 * @param {*} bitCoinData
 */
function drawChart(bitCoinData) {
  var ctx = document.getElementById("my-chart").getContext("2d");

  const coinDeskDates = Object.keys(bitCoinData);
  const coinDeskPrices = coinDeskDates.map((date) => bitCoinData[date]);

  console.log(coinDeskDates);
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
}

// from-date  to-date
document.getElementById("from-date").addEventListener("change", () => {
  getDatesCoinsData();
});

document.getElementById("to-date").addEventListener("change", () => {
  getDatesCoinsData();
});

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
