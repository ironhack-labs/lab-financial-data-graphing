// import Axios from "axios";
// const Axios = require("axios")
const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d")
const api = "https://api.coindesk.com/v1/bpi/historical/close.json?index=[USD/CNY]"

axios.get(api).then((data)=>{
data = data.data.bpi

const stockLabels=[]
const stockPrice =[]

for (let key in data) {
    stockLabels.push(key)
    stockPrice.push(data[key])
}

console.log(stockPrice, stockLabels)
var graphic = new Chart(ctx, {
    type: "line",
    data: {
        labels: stockLabels,
        datasets: [{
          label: "Stock Chart",
          borderWidth: Math.random() * 10,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: "red",
          data: stockPrice,
        }]}
});
});

