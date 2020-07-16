// index.js
const fromInput = document.querySelector('#from')
const toInput = document.querySelector('#to')
const currencyInput = document.querySelector('#currency')
const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json'
const maxValue = document.querySelector('.max')
const minValue = document.querySelector('.min')

// const currencyUrl = 'https://api.coindesk.com/v1/bpi/supported-currencies.json'

// axios
//   .get(currencyUrl)
//   .then((currencies) => {
//     const optionElem = document.createElement('option')
//     currencyInput.innerHTML = ''
//     currencies.forEach((currency) => {
//       optionElem.setAttribute('value', currency.currency)
//       optionElem.innerText = currency.currency
//       currencyInput.appendChild(optionElem)
//     })
//   })
//   .catch((e) => console.log(e))

axios
  .get(apiUrl)
  .then((responseFromAPI) => {
    console.log(responseFromAPI.data)
    printTheChart(responseFromAPI.data) // <== call the function here where you used to console.log() the response
    const dailyData = responseFromAPI.data['bpi']
    const stockPrices = Object.keys(dailyData)
    const dailyPrice = stockPrices.map((price) => dailyData[price])
    console.log(dailyPrice)

    maxValue.innerHTML = Math.max(...dailyPrice)
    minValue.innerHTML = Math.min(...dailyPrice)
  })
  .catch((err) => console.log('Error while getting the data: ', err))

function printTheChart(stockData) {
  const dailyData = stockData['bpi']

  const stockDates = Object.keys(dailyData)
  const stockPrices = stockDates.map((date) => dailyData[date])

  const ctx = document.getElementById('my-chart').getContext('2d')
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockDates,
      datasets: [
        {
          label: 'Stock Chart',
          backgroundColor: 'rgba(252, 193, 24, 0.3)',
          borderColor: 'rgb(252, 193, 24)',
          data: stockPrices
        }
      ]
    }
  }) // closes chart = new Chart()
} // closes printTheChart()

function getCurrencyUrl() {
  const curency = currencyInput.value
  const toValue = toInput.value
  const fromValue = fromInput.value
  // console.log(currencyInput.value)
  const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${curency}&start=${fromValue}&end=${toValue}`
  return apiUrl
}

function getDatesUrl() {
  const toValue = toInput.value
  const fromValue = fromInput.value
  // console.log(`FROM: ${fromValue} / TO: ${toValue}`)
  const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromValue}&end=${toValue}`
  return apiUrl
}

toInput.addEventListener('change', () => {
  axios
    .get(getDatesUrl())
    .then((responseFromAPI) => {
      console.log(responseFromAPI.data)
      printTheChart(responseFromAPI.data) // <== call the function here where you used to console.log() the response

      const dailyData = responseFromAPI.data['bpi']
      const stockPrices = Object.keys(dailyData)
      const dailyPrice = stockPrices.map((price) => dailyData[price])
      console.log(dailyPrice)

      const maxValue = document.querySelector('.max')
      const minValue = document.querySelector('.min')

      maxValue.innerText = Math.max(...dailyPrice)
      minValue.innerText = Math.min(...dailyPrice)
    })
    .catch((err) => console.log('Error while getting the data: ', err))

  function printTheChart(stockData) {
    const dailyData = stockData['bpi']

    const stockDates = Object.keys(dailyData)
    const stockPrices = stockDates.map((date) => dailyData[date])

    const ctx = document.getElementById('my-chart').getContext('2d')
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: stockDates,
        datasets: [
          {
            label: 'Stock Chart',
            backgroundColor: 'rgba(252, 193, 24, 0.3)',
            borderColor: 'rgb(252, 193, 24)',
            data: stockPrices
          }
        ]
      }
    }) // closes chart = new Chart()
  } // closes printTheChart()
})

currencyInput.addEventListener('change', () => {
  axios
    .get(getCurrencyUrl())
    .then((responseFromAPI) => {
      console.log(responseFromAPI.data)
      printTheChart(responseFromAPI.data) // <== call the function here where you used to console.log() the response
    })
    .catch((err) => console.log('Error while getting the data: ', err))

  function printTheChart(stockData) {
    const dailyData = stockData['bpi']

    const stockDates = Object.keys(dailyData)
    const stockPrices = stockDates.map((date) => dailyData[date])

    const ctx = document.getElementById('my-chart').getContext('2d')
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: stockDates,
        datasets: [
          {
            label: 'Stock Chart',
            backgroundColor: 'rgba(252, 193, 24, 0.3)',
            borderColor: 'rgb(252, 193, 24)',
            data: stockPrices
          }
        ]
      }
    }) // closes chart = new Chart()
  } // closes printTheChart()
})
