const from = document.getElementById("from");
const to = document.getElementById("to");
const currency = document.getElementById(`currency`);

today = new Date();
lastMonth = new Date();
lastMonth.setDate(lastMonth.getDate() - 30);
document.getElementById("from").valueAsDate = lastMonth;
document.getElementById("to").valueAsDate = today;

document.addEventListener("DOMContentLoaded", () => print(from, to, currency));
from.addEventListener(`change`, () => print(from, to, currency));
to.addEventListener(`change`, () => print(from, to, currency));
currency.addEventListener(`change`, () => print(from, to, currency));

const print = (from, to, currency) => {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${
        from.value
      }&end=${to.value}&currency=${currency.value}`
    )
    .then(response => {
      printTheChart(response.data.bpi);
    })
    .catch(error => console.log(error));

  const printTheChart = bitcoinData => {
    const bitcoin = [];
    const date = [];

    for (var key in bitcoinData) {
      date.push(key);
      bitcoin.push(bitcoinData[key]);
    }
    const min = Math.min.apply(null, bitcoin);
    const max = Math.max.apply(null, bitcoin);
    document.getElementById("max").innerText = "Max: " + max;
    document.getElementById("min").innerText = "Min: " + min;

    const ctx = document.getElementById("canvas").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: date,
        datasets: [
          {
            label: "Bitcoin Price Index",
            backgroundColor: "rgb(128, 179, 255, 0.4)",
            borderColor: "rgb(0, 61, 153)",
            pointBackgroundColor: "rgb(0, 102, 255, 0.6)",
            pointBorderColor: "rgb(0, 61, 153)",
            pointBorderWidth: "5",
            data: bitcoin
          }
        ]
      }
    });
  };
};
