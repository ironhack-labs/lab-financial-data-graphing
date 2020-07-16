const inputs = document.querySelectorAll("input[type=date]")
const currencyOption = document.getElementById("currency")

const allElements = [currencyOption,...inputs]


allElements.forEach((el) =>
  el.addEventListener("change", function () {
    const currency = document.getElementById("currency").value
    const startDate = document.getElementById("date-value-start").value
    const endDate = document.getElementById("date-value-end").value
    getData(startDate, endDate, currency)
  })
)

const currency = document.getElementById("currency").value
const startDate = document.getElementById("date-value-start").value
const endDate = document.getElementById("date-value-end").value

function getData(startDate, endDate, currency) {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&?start=${startDate}&end=${endDate}&`
    )
    .then((responseFromAPI) => {
      printTheChart(responseFromAPI.data.bpi);
    })
    .catch((err) => console.log("Error while getting the data: ", err));
}

function printTheChart(bitcoinPriceIndex) {
  const dailyData = bitcoinPriceIndex;
  const dates = Object.keys(bitcoinPriceIndex);
  const valuesPrice = dates.map((value) => dailyData[value])
  const maxPrice = Math.max.apply( Math, valuesPrice ) 
  const minPrice = Math.min.apply( Math, valuesPrice ) 
  document.getElementById('max-value').innerText = `${maxPrice}`
  document.getElementById('min-value').innerText = `${minPrice}`
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
  })
} 



getData(startDate, endDate, currency)