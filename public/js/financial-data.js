const HISTORICAL_BPI_API = "https://api.coindesk.com/v1/bpi/historical/close.json"

function btiData(currency = "USD", start, end) {
    return axios.get(`${HISTORICAL_BPI_API}?currency=${currency}&start=${start}&end=${end}`).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log("error", error)
    });
}

let myChart = null 
let currency = "USD"
let start = "2013-01-01"
let end = "2022-07-31"



function display(currency = "USD", start, end) {
  btiData(currency, start, end)
    .then(({ bpi }) => {
      let btiKey = Object.keys(bpi) 
      let btiValue = Object.values(bpi) 
      const data = {
        labels: btiKey,
        datasets: [{
          label: 'PRICE INDEX',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: btiValue,
        }]
      } 

     let min = Math.min(...btiValue)
     let max = Math.max(...btiValue)
     document.getElementById('min').textContent = min
     document.getElementById('max').textContent = max
        console.log(min,max)

      const config = {
        type: 'line',
        data: data,
        options: {}
      } 
      if (myChart != null) {
        myChart.destroy() 
      }
      myChart = new Chart(
        document.getElementById('myChart'),
        config
      ) 
    })
}

display(currency, start, end) 

let started = document.getElementsByClassName('start-date') 
console.log(started)
started[0].addEventListener('reload',(res) => {
  start = res.target.value 
  display(currency, start, end)
}) 

let ended = document.getElementsByClassName('end-date') 
ended[0].addEventListener('reload',(res) => {
  end = res.target.value 
  display(currency, start, end)
}) 

let newCurrency = document.getElementsByClassName('currency-type')
  newCurrency[0].addEventListener('reload',(res) => {
    currency = res.target.value
    display(currency, start, end)
  })