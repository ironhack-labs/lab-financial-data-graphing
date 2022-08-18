// const apiUrl = "https://api.coindesk.com/v1/bpi/historical/close.json";

// const apiUrl2 =
//   "https://api.coindesk.com/v1/bpi/historical/close.json?start=2010-09-01&end=2022-09-05";

// get https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05

// http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}

function getDom() {
  const startDate = document.getElementById("begin").value;
  const endDate = document.getElementById("end").value;
  const selectCCY = document.getElementById("ccy");
  const currency = selectCCY.options[selectCCY.selectedIndex].value;
  const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`;
  return apiUrl;
}

var button = document.getElementById("button");
button.addEventListener("click", function (event) {
  const url = getDom();

  axios
    .get(url)
    .then((responseFromAPI) => {
      printTheChart(responseFromAPI.data.bpi);
    })
    .catch((err) => console.log("Error while getting the data: ", err));
});

function printTheChart(histBtcPrice) {
  const btcDates = Object.keys(histBtcPrice);
  const btcPrices = Object.values(histBtcPrice);

  const ctx = document.getElementById("canvas-chart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: btcDates,
      datasets: [
        {
          label: "Stock Chart",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: btcPrices,
        },
      ],
    },
  }); // closes chart = n
}
