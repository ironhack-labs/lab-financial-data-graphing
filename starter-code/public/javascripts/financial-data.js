const inputFrom = document.getElementById("from");
const inputTo = document.getElementById("to");
const currency = document.getElementById("currency");

function request() {
  if (inputFrom.value !== "" && inputTo.value !== "") {
    console.log(currency);
    console.log(inputFrom.value);
    axios

      .get(
        `http://api.coindesk.com/v1/bpi/historical/close.json?start=${
          inputFrom.value
        }&end=${inputTo.value}&currency=${currency.value}`
      )
      .then(result => {
        const dates = Object.keys(result.data.bpi);
        const resultArr = [];
        dates.map(el => resultArr.push(result.data.bpi[el]));
        printTheChart(dates, resultArr);
      });
  }
}

// https://api.coindesk.com/v1/bpi/currentprice/CNY.json

let printTheChart = (dates, data) => {
  let ctx = document.getElementById("myChart").getContext("2d");

  let chart2 = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Bitcoin price index",
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: "rgb(54, 162, 235)",
          data: data
        }
      ]
    },

    // Configuration options go here
    options: {}
  });
};
