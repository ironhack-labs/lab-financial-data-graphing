const inputs = document.querySelectorAll("input[type=date]")
const currencyOption = document.getElementById("currency")
const currency = document.getElementById("currency").value





inputs.forEach((el) =>
  el.addEventListener("change", function () {
    const startDate = document.getElementById("date-value-start").value;
    const endDate = document.getElementById("date-value-end").value;
    getData(startDate, endDate);
  })
);

const startDate = document.getElementById("date-value-start").value;
const endDate = document.getElementById("date-value-end").value;

function getData(startDate, endDate, currency) {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}?currency=${currency}`
    )
    .then((responseFromAPI) => {
      printTheChart(responseFromAPI.data.bpi);
      // <== call the function here where you used to console.log() the response
    })
    .catch((err) => console.log("Error while getting the data: ", err));

  function printTheChart(bitcoinPriceIndex) {
    const dailyData = bitcoinPriceIndex;
    const dates = Object.keys(bitcoinPriceIndex);
    const valuesPrice = dates.map((value) => dailyData[value]);
    const ctx = document.getElementById("my-chart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Bitcoin Price Index",
            backgroundColor: "rgba(255, 99, 132, .5)",
            borderColor: "grey",
            data: valuesPrice,
          },
        ],
      },
    }); // closes chart = new Chart()
  } // closes printTheChart()
}

currencyOption.addEventListener("change", getData(startDate, endDate, currency) )

window.addEventListener("load", getData(startDate, endDate, currency), false);
