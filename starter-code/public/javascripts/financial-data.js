const bitcoinAPI = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/historical'
})


const getClosePrices = ()=>{
  //console.log('entro en getClosePrices')

  const dates = {
    start: document.getElementById('start').value,
    end: document.getElementById('end').value,
  }
  const currency = document.getElementById('currency').value

  let query;

  if(dates.start && dates.end && currency) {
    query = `?start=${dates.start}&end=${dates.end}&currency=${currency}`
  }
  else if (currency){
    query = `?currency=${currency}`
  }
  bitcoinAPI.get(`/close.json${query}`)
      .then(results => {
        printTheChart(results.data.bpi)
      })
      .catch(err => console.log(err))
}

const printTheChart = (data) =>{
  const labels = Object.keys(data)
  const prices = Object.values(data)

  const ctx = document.getElementById('chart').getContext('2d')

  console.log(prices)
  document.getElementById('max').innerText= `${Math.max(...prices)} ${document.getElementById('currency').value}`
  document.getElementById('min').innerText = `${Math.min(...prices)} ${document.getElementById('currency').value}`
  
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: "Bitcoin Chart",
          backgroundColor: 'red',
          borderColor: 'white',
          data: prices
        }
      ]
    }
  })
}

getClosePrices()
document.getElementById('start').onchange = () => getClosePrices()
document.getElementById('end').onchange = () => getClosePrices()
document.getElementById('currency').onchange = () => getClosePrices()

