//https://api.coindesk.com/v1/bpi/historical/close.json?currency=USD
window.onload = () => {
  let dateFromInput = document.getElementById("dateFrom");
  let dateToInput = document.getElementById("dateTo");
  let btnUpdate = document.getElementById("btn-Update");
  let drop = document.getElementById("currency");
  let dateFrom = "2018-03-08";
  let dateTo = "2018-04-08";
  let currency = "USD";
  let api_url = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${dateFrom}&end=${dateTo}`;
  // dateFrom.valueAsDate = new Date();
  dateToInput.valueAsDate = new Date();
  dateFromInput.value = dateFrom;

  btnUpdate.onclick = () => {
    dateFrom = dateFromInput.value;
    dateTo = dateToInput.value;
    currency = drop.value;
    api_url = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${dateFrom}&end=${dateTo}`;
    reloadChart(api_url);
    getMaxMin(api_url, currency);
  };

  reloadChart(api_url);
  getMaxMin(api_url, currency);
};
function getMaxMin(api_url, currency) {

  axios
    .get(api_url)
    .then(res => res.data.bpi)
    .then(values => {
      data = Object.values(values);
      let min = Math.min.apply(0,data);
      let max = Math.max.apply(0,data);
      let minMax = {
        min: min,
        max: max
      };
      console.log(minMax);
      document.getElementById("max").textContent = minMax.max + ' ' + currency;
      document.getElementById("min").textContent = minMax.min + ' ' + currency;
    });
}

function reloadChart(api_url) {
  axios
    .get(api_url)
    .then(res => res.data.bpi)
    .then(values => drawChart(values));
}
const drawChart = data => {
  let stockLabels = Object.keys(data);
  let stockPrice = Object.values(data);

  let ctx = document.getElementById("myChart").getContext("2d");
  let chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockLabels,
      datasets: [
        {
          label: "Stock Chart",
          borderColor: "#FFAE00",
          data: stockPrice
        }
      ],
      options: {
        fill: false
      }
    }
  });
};
