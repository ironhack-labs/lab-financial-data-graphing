const dateStartInput = document.querySelector("#dateStart");
const dateEndInput = document.querySelector("#dateEnd");
const currencySelectInput = document.querySelector("#currency");
const minSpan = document.querySelector("#min");
const maxSpan = document.querySelector("#max");

init();
getDataFromAPI();

function init() {
  let now = new Date();
  let thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(now.getDate() - 30);
  dateStartInput.value = thirtyDaysFromNow.toISOString().split("T")[0];
  dateEndInput.value = now.toISOString().split("T")[0];
}

function draw(labels, prices) {
  var chartCanvas = document.querySelector("#chart");
  var ctx = chartCanvas.getContext("2d");

  var chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Mi grafico",
          backgroundColor: "rgb(0, 0, 0)",
          borderColor: "rgb(0, 0, 0)",
          data: prices
        }
      ]
    }
  });
}

function getDataFromAPI() {
  let dateStartString = dateStartInput.value;
  let dateEndString = dateEndInput.value;
  let currency = currencySelectInput.value;

  let url = "http://api.coindesk.com/v1/bpi/historical/close.json";

  if (dateStartString !== "" && dateEndString !== "") {
    url += `?start=${dateStartString}&end=${dateEndString}`;
  }

  url += `&currency=${currency}`;

  axios
    .get(url)
    .then(bitcoinData => {
      var labels = Object.keys(bitcoinData.data.bpi);
      var prices = Object.values(bitcoinData.data.bpi);

      updateMinAndMax(prices);
      draw(labels, prices);
    })
    .catch(err => console.log(err));
}

function updateMinAndMax(prices) {
    minSpan.innerHTML = Math.min(...prices);
    maxSpan.innerHTML = Math.max(...prices);
}

dateStartInput.addEventListener("change", e => getDataFromAPI());
dateEndInput.addEventListener("change", e => getDataFromAPI());
currencySelectInput.addEventListener("change", e => getDataFromAPI());
