let chart;
const dateFromId = document.querySelector("#fromId");
const dateToId = document.querySelector("#toId");
const currencyId = document.querySelector("#currencyId");
const minId = document.querySelector("#min");
const maxId = document.querySelector("#max");

function chartCreate() {
  const dateFrom = dateFromId.value;
  const dateTo = dateToId.value;
  const currency = currencyId.value;
  const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}&currency=${currency}`;

  function getDataPrint(apiUrl) {
    axios
      .get(apiUrl)
      .then(res => {
        const chartDates = Object.keys(res.data.bpi);
        const chartCoin = Object.values(res.data.bpi);
        const min = Math.min(...chartCoin);
        const max = Math.max(...chartCoin);
        minId.innerHTML = min;
        maxId.innerHTML = max;

        const ctx = document.getElementById("myChart").getContext("2d");
        chart = new Chart(ctx, {
          // The type of chart we want to create
          type: "line",
          // The data for our dataset
          data: {
            labels: chartDates,
            datasets: [
              {
                label: "BitCoin",
                backgroundColor: "lightGray",
                borderColor: "red",
                data: chartCoin
              }
            ]
          }
        });
      })
      .catch(err => console.log("Error while getting the data: ", err));
  }
  getDataPrint(apiUrl);
}

dateFromId.addEventListener("change", function() {
  chart.destroy();
  chartCreate();
});

dateToId.addEventListener("change", function() {
  chart.destroy();
  chartCreate();
});

currencyId.addEventListener("change", function() {
  chart.destroy();
  chartCreate();
});

chartCreate();
