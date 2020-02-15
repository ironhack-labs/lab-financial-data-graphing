//Create canvas and chart

let chart;
const ctx = document.getElementById("myChart").getContext("2d");
let myChart = (labels, data, title) => {
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: title,
          data: data,
          backgroundColor: ["rgba(26, 162, 97, 0.2)"],
          borderColor: ["rgba(26, 162, 97, 1)"],
          borderWidth: 1
        }
      ]
    }
  });
};

//Set default dates with 30 day interval starting today

let date = new Date();
const today = date.toJSON().slice(0, 10);
date.setDate(date.getDate() - 30);
const minusThirty = date.toJSON().slice(0, 10);

const getDataAndDraw = (currency, start = minusThirty, end = today) => {
  console.log(currency);
  axios
    .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`)
    .then(res => {
      const chartDates = Object.keys(res.data.bpi);
      const chartValues = Object.values(res.data.bpi);
      return myChart(chartDates, chartValues, `BPI to ${currency} Exchange`);
    })
    .catch(err => console.log("ERROR", err));
};

const dateFrom = document.getElementById("dateFrom");
const dateTo = document.getElementById("dateTo");
const currency = document.getElementById("currency");

document.addEventListener("DOMContentLoaded", getDataAndDraw("USD"));

//Set default values to input fields
dateFrom.setAttribute("value", minusThirty);
dateTo.setAttribute("value", today);

//Re-draw chart on input date change
dateFrom.onchange = () => {
  chart.destroy();
  getDataAndDraw(currency.value, dateFrom.value, dateTo.value);
};
dateTo.onchange = () => {
  chart.destroy();
  getDataAndDraw(currency.value, dateFrom.value, dateTo.value);
};
currency.onchange = () => {
  chart.destroy();
  getDataAndDraw(currency.value);
};
