const dateFrom = document.getElementById("dateFrom");
const dateTo = document.getElementById("dateTo");
const currency = document.getElementById("currency");
let minDisplay = document.getElementById("min");
let maxDisplay = document.getElementById("max");

//Set default dates with 30 day interval starting today
let date = new Date();
const today = date.toJSON().slice(0, 10);
date.setDate(date.getDate() - 30);
const minusThirty = date.toJSON().slice(0, 10);

//Get BPI from API and draw chart
const getDataAndDraw = (currency, start = minusThirty, end = today) => {
  console.log(currency);
  axios
    .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`)
    .then(res => {
      const dates = Object.keys(res.data.bpi).map(date => date.slice(5));
      const price = Object.values(res.data.bpi);
      const minValue = Math.min(...price);
      const maxValue = Math.max(...price);
      minDisplay.setAttribute("value", minValue);
      maxDisplay.setAttribute("value", maxValue);
      console.log(minValue, maxValue);
      return myChart(dates, price, `BPI to ${currency} Exchange`);
    })
    .catch(err => console.log("ERROR", err));
};

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
