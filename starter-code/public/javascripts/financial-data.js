const ctx = document.getElementById('myChart').getContext('2d');
let currency = "USD";

inputChange();

function inputChange(e) {
    const startDate = document.getElementById('start').value;
    const endDate = document.getElementById('end').value;
    const currencySelect = document.getElementById('currency');
    currency = currencySelect.options[currencySelect.selectedIndex].value;
    const filters = `start=${startDate}&end=${endDate}&currency=${currency}`;
    getBitCoinChart(filters);
}

function getBitCoinChart(filters) {
const filtersString = filters ? `?${filters}` : "";
axios.get("https://api.coindesk.com/v1/bpi/historical/close.json" + filtersString)
.then(function (response) {
    const labels = Object.keys(response.data.bpi);
    const data = Object.values(response.data.bpi);
    document.getElementById("maxValue").innerText = `${parseInt(Math.max(...data))} ${currency}`;
    document.getElementById("minValue").innerText = `${parseInt(Math.max(...data))} ${currency}`;
    fromLineChart(data, labels);
  })
  .catch(function (error) {
    console.log(error);
});
}


function fromLineChart(data, labels) {
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: "Bit Coin Price",
              data: data,
              borderWidth: 1
          }]
      },
   });
  }