const ctx = document.querySelector('canvas').getContext('2d')
const start = document.querySelector('#start')
const end = document.querySelector('#end')


let today = new Date()
let dd = String(today.getDate()).padStart(2, '0')
let mm = String(today.getMonth() + 1).padStart(2, '0') 
let yyyy = today.getFullYear()
today = yyyy + '-' + mm + '-' + dd

const currency = document.querySelector('#currency')


const createGraph = async (startValue, endValue, currency = 'USD') => {
  let bitcoinPrice
  
  if (!startValue && !endValue) {
    bitcoinPrice = await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`)
  } else if (startValue && endValue) {
    bitcoinPrice = await axios.get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startValue}&end=${endValue}&currency=${currency}`
    )
    
  } else if (startValue) {
    bitcoinPrice = await axios.get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startValue}&end=${today}&currency=${currency}`
    )
  } else if (endValue) {
    bitcoinPrice = await axios.get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?${endValue}&currency=${currency}`
    )
  }

  const rawData = bitcoinPrice.data.bpi
  console.log(rawData)

  const labels = []
  const data = []
  for (let key in rawData) {
    labels.push(key)
    data.push(rawData[key])
  }


  const myGraph = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'My first data set',
          data,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    }
  })
}

createGraph()

const changeGraphic = () => {
  const startValue = start.value
  const endValue = end.value
  const currencyValue = currency.value

  createGraph(startValue, endValue, currencyValue)
}

start.onchange = changeGraphic
end.onchange = changeGraphic
currency.onchange = changeGraphic