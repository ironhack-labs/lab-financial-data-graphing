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
  //console.log(Math.min.apply(Math, btcPrices), Math.max.apply(Math, btcPrices));

  //   document.getElementById("high").innerHTML = `MAX23: ${Math.max.apply(
  //     Math,
  //     btcPrices
  //   )}`;
  //   document.getElementById("low").innerHTML = `MIN32: ${Math.min.apply(
  //     Math,
  //     btcPrices
  //   )}`;

  document.getElementsByClassName("high")[0].innerHTML =
    "MAX: " + String(Math.max.apply(Math, btcPrices));
  document.getElementsByClassName("low")[0].innerHTML =
    "MIN: " + String(Math.min.apply(Math, btcPrices));

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
