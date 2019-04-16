// import Axios from "axios";
// const Axios = require("axios")
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

var start = "2019-01-03";
var end = "2019-04-05";
var currency = "USD";
draw(start, end, currency);

function refresh() {
  currency = document.getElementById("currency").value;
  start = document.querySelector("#start").value;
  end = document.querySelector("#end").value;
  draw(start, end, currency);
}

document.getElementById("start").onchange = refresh;
document.getElementById("end").onchange = refresh;
document.getElementById("currency").onchange = refresh;

let min = document.getElementById("min")
let max = document.getElementById("max")

function draw(start, end, currency) {
  api = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency} `;

  axios.get(api).then(data => {
    data = data.data.bpi;
    const stockLabels = [];
    const stockPrice = [];
    for (let key in data) {
      stockLabels.push(key);
      stockPrice.push(data[key]);
    }
    min.innerText = Math.min(...stockPrice)
    max.innerText = Math.max(...stockPrice)
    console.log(stockPrice, stockLabels);
    var graphic = new Chart(ctx, {
      type: "line",
      data: {
        labels: stockLabels,
        datasets: [
          {
            label: "Stock Chart",
            borderWidth: Math.random() * 10,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "red",
            data: stockPrice
          }
        ]
      }
    });
  });
}
