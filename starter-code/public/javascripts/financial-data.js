const bitcoinAPI = axios.create({
  baseURL: 'https://api.coindesk.com/v1/bpi/historical/close.json'
})

console.log(bitcoinAPI)
const getClosePrices = ()=>{
  console.log('entro en getClosePrices')
  bitcoinAPI.get()
  .then(results => {
    printTheChart(results.data.bpi);

  })
  .catch(err=>console.log(err))
}

const printTheChart = (data) =>{
  const labels = Object.keys(data)
  const prices = Object.values(data)

  const ctx = document.getElementById('chart').getContext('2d')

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