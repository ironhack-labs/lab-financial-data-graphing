const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const inputStart = document.getElementById('start')
const inputEnd = document.getElementById('end')
const selectOption = document.getElementById('currency')
let startDate = new Date().toLocaleDateString('en-CA')
let endDate = new Date().toLocaleDateString('en-CA')
let currency

const urlHist = "http://api.coindesk.com/v1/bpi/historical/close.json"

selectOption.onchange = function () {
  currency = this.value
  urlFilter = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`
  start(urlFilter);
}

inputStart.onchange = function () {
  startDate = this.value
  urlFilter = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`
  start(urlFilter);
}

inputEnd.onchange = function () {
  endDate = this.value
  urlFilter = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`
  start(urlFilter);
}

function start(url) {
  axios.get(url)
    .then((data) => {
      let time = Object.keys(data.data.bpi)
      let values = Object.values(data.data.bpi)

      var myLineChart = new Chart(context, {
        type: 'line',
        data: {
          labels: time,
          datasets: [{
            label: 'Bitcoin Price Index',
            data: values,
          }]
        },
        options: {}
      });
    })
    .catch(error => console.log(error))
}

start(urlHist)
