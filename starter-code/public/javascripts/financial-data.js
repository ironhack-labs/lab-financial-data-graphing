import Axios from "axios";

let startDate, endDate

document.querySelector('#start').onchange(e)=function(){
  startDate = e.target.value;
  drawChart();
}

document.querySelector('#end').onchange(e)=function(){
  startDate = e.target.value;
  drawChart();
}

function drawChart (){
  Axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
    .then()
}