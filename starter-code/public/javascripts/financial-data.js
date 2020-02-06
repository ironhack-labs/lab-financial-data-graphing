let minUserDate = document.getElementById("start");
let maxUserDate = document.getElementById("end");
let currencyValue = document.getElementById("currency");

const drawChart = (dates, prices) => {
  let ctx = document.getElementById("myChart");

  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Bitcoin Price index",
          data: prices,
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {}
          }
        ]
      }
    }
  });
};

axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then(response => {
    let rawDates = response.data.bpi;
    let dates = Object.keys(rawDates);
    let prices = Object.values(rawDates);

    drawChart(dates, prices);
  });

const updated = () => {
  let end = maxUserDate.value;
  let start = minUserDate.value;
  axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`
    )
    .then(response => {
      let rawDates = response.data.bpi;
      let dates = Object.keys(rawDates);
      let prices = Object.values(rawDates);

      drawChart(dates, prices);
    });
};

const currency = () => {
  let cash = currencyValue.value;
  console.log(cash);
  axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${cash}`
    )
    .then(response => {
      let rawDates = response.data.bpi;
      let dates = Object.keys(rawDates);
      let prices = Object.values(rawDates);

      drawChart(dates, prices);
    });
};

document.getElementById("search-button").onclick = updated;
document.getElementById("currency-button").onclick = currency;
