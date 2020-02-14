let chart;
const dateFromId = document.querySelector("#fromId");
const dateToId = document.querySelector("#toId");
const currencyId = document.querySelector("#currencyId");
const minId = document.querySelector("#min");
const maxId = document.querySelector("#max");



function chartMaster(){
  const dateFrom = dateFromId.value;
  const dateTo = dateToId.value;
  const currency = currencyId.value;
  const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}&currency=${currency}`;

  function getDataandPrint(apiUrl){
    axios
  .get(apiUrl)
  .then(responseFromAPI => {
    const chartDates = Object.keys(responseFromAPI.data.bpi);
    const chartCoin = Object.values(responseFromAPI.data.bpi);
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
          backgroundColor: "teal",
          borderColor: "lightblue",
          data: chartCoin
        }
      ]
    },
  });

  }).catch(err => console.log("Error while getting the data: ", err));
  }
  getDataandPrint(apiUrl);
}

dateFromId.addEventListener("change", function() {
  chart.destroy();
  chartMaster();
});

dateToId.addEventListener("change", function() {
  chart.destroy();
  chartMaster();
});

currencyId.addEventListener("change", function() {
  chart.destroy();
  chartMaster();
});

chartMaster();

  