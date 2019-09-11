const getPrices = () =>{
  const from = document.getElementById("from-input").value;
  const to = document.getElementById("to-input").value;
  const currency = document.getElementById("currency-input").value
  console.log(from)
  console.log(to)
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}&currency=${currency}`)
  .then(response=>{
      console.log(response)
      printCharts(response)})
      // .catch(err => console.log('error',err))
  }

const printCharts = info => {
  showBarChart('myCanvas', info)
  document.getElementById('max').innerHTML = Math.max(...Object.values(info.data.bpi))
  document.getElementById('min').innerHTML = Math.min(...Object.values(info.data.bpi))
}

const showBarChart = (id, info) => {
  new Chart(id, {
      type: 'line',
      data: {
          labels: Object.keys(info.data.bpi),
          datasets: [{
              label: 'Prices',
              data: Object.values(info.data.bpi),
              borderColor: 'rgba(0, 50, 250, .7)',
              backgroundColor: 'rgba(0, 250, 50, .2)',
              borderWidth: 1
          }]
      }
  })
}

document.getElementById('btn-draw').onclick = getPrices 