const url = `http://api.coindesk.com/v1/bpi/historical/close.json`;
let ctx = document.getElementById("myChart").getContext("2d");
const maxValue = document.getElementsByClassName("max-value")[0];
const minValue = document.getElementsByClassName("min-value")[0];

function createChart(xaxis, yaxis) {
  let myChart = new Chart(ctx, {
    type: "line",
    data: {
      //x Axis
      labels: xaxis,
      datasets: [
        {
          label: "Bitcoin Price Index",
          //y axis
          data: yaxis,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function getResponse(urlVar) {
  axios
    .get(urlVar)
    .then((data) => {
      console.log(data);
      let keys = Object.keys(data.data.bpi);
      let values = Object.values(data.data.bpi);
      createChart(keys, values);
      maxValue.innerHTML = Math.max.apply(Math, values);
      minValue.innerHTML = Math.min.apply(Math, values);
    })
    .catch((err) => {
      console.log(err);
    });
}

getResponse(url);

/* 3rd iteration */
const startDate = document.getElementById("start-date");
const finishDate = document.getElementById("finish-date");

function filterData() {
  const urlFilter = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate.value}&end=${finishDate.value}`;
  getResponse(urlFilter);
}

startDate.addEventListener("change", () => {
  if (finishDate.value) {
    filterData();
  }
});

finishDate.addEventListener("change", () => {
  if (startDate.value) {
    filterData();
  }
});

/* 4th iteration */
const currency = document.getElementById("currency");

function changeCurrency() {
  const currencyUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency.value}`;
  getResponse(currencyUrl);
}

currency.addEventListener("change", () => {
  changeCurrency();
});
