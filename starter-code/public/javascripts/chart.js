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
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
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

const chartHistoricalBPI = (start = minusThirty, end = today) => {
  axios
    .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
    .then(res => {
      const chartDates = Object.keys(res.data.bpi);
      const chartValues = Object.values(res.data.bpi);
      return myChart(chartDates, chartValues, "Title");
    })
    .catch(err => console.log("ERROR", err));
};

document.addEventListener("DOMContentLoaded", chartHistoricalBPI());

const dateFrom = document.getElementById("dateFrom");
const dateTo = document.getElementById("dateTo");

//Set default values to input fields
dateFrom.setAttribute("value", minusThirty);
dateTo.setAttribute("value", today);

//Re-draw chart on input date change
dateFrom.onchange = () => {
  chart.destroy();
  chartHistoricalBPI(dateFrom.value, dateTo.value);
};
dateTo.onchange = () => {
  chart.destroy();
  chartHistoricalBPI(dateFrom.value, dateTo.value);
};
