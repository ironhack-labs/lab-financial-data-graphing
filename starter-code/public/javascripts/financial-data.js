let btcData = {
  starDate: "2018-01-01",
  endDate: yyyymmdd(),
  currency: "USD"
};

function yyyymmdd() {
  var x = new Date();
  var y = x.getFullYear().toString();
  var m = (x.getMonth() + 1).toString();
  var d = x.getDate().toString();
  d.length == 1 && (d = "0" + d);
  m.length == 1 && (m = "0" + m);
  var yyyymmdd = `${y}-${m}-${d}`;
  return yyyymmdd;
}

function dateSelectorChangeHandler() {
  btcData.starDate = document.getElementById("startDate").value;
  btcData.endDate = document.getElementById("endDate").value;

  drawBitcoinPrice(btcData);
}

function currencySelectorChangeHandler() {
  btcData.currency = document.getElementById("currencyButton").value;

  drawBitcoinPrice(btcData);
}

function drawBitcoinPrice(btcData) {
  const stockInfo = axios.create({
    baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
  });

  stockInfo
    .get(
      `?currency=${btcData.currency}&&?start=${btcData.starDate}&end=${
        btcData.endDate
      }`
    )
    .then(response => {
      printTheChart({
        labels: Object.keys(response.data.bpi),
        dataPrice: Object.values(response.data.bpi)
      });
    })
    .catch(error => {
      console.log(error);
    });

  //chart rendering function
  const printTheChart = stockData => {
    const stockLabels = stockData.labels;
    const stockPrice = stockData.dataPrice;

    const ctx = document.getElementById("btcPrice").getContext("2d");
    //here we give the chart the data it needs
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: stockLabels,
        datasets: [
          {
            label: "Stock Chart",
            backgroundColor: "rgb(255, 99, 132)",
            fill: false,
            tension: 0,
            pointHoverRadius: 20,
            borderColor: "rgb(255, 99, 132)",
            data: stockPrice
          }
        ]
      }
    });
  };
}

drawBitcoinPrice(btcData);
document.getElementById("startDate").onchange = dateSelectorChangeHandler;
document.getElementById(
  "currencyButton"
).onchange = currencySelectorChangeHandler;
document.getElementById("endDate").value = yyyymmdd();
