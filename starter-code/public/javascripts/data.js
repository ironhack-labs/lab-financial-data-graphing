const dateFrom = document.getElementById("dateFrom");
const dateTo = document.getElementById("dateTo");
const currency = document.getElementById("currency");
let minDisplay = document.getElementById("min");
let maxDisplay = document.getElementById("max");

//Set default dates with 30 day interval starting today
const setDateBack = days => {
  let date = new Date();
  date.setDate(date.getDate() - days);
  return date.toJSON().slice(0, 10);
};
const today = setDateBack(0);
const minusThirty = setDateBack(30);

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

//Set default values for input fields
dateFrom.setAttribute("value", minusThirty);
dateTo.setAttribute("value", today);

//Draw chart
document.addEventListener("DOMContentLoaded", getDataAndDraw("USD"));

//Re-draw chart on date and currency change
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
