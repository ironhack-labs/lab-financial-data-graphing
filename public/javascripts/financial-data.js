// index.js
const fromInput = document.querySelector('#from')
const toInput = document.querySelector('#to')
const currencyInput = document.querySelector('#currency')
const maxValue = document.querySelector('.max')
const minValue = document.querySelector('.min')

const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json'

//getting currencies from data
const currencyUrl = 'https://api.coindesk.com/v1/bpi/supported-currencies.json'

axios
  .get(currencyUrl)
  .then((currencies) => {
    currencyInput.innerHTML = '<option selected>Change currency</option>'
    currencies.data.forEach((currency) => {
      const optionElem = document.createElement('option')
      optionElem.setAttribute('value', currency.currency)
      optionElem.innerText = currency.currency
      currencyInput.appendChild(optionElem)
    })
  })
  .catch((e) => console.log(e))

axios
  .get(apiUrl)
  .then((responseFromAPI) => {
    console.log(responseFromAPI.data)
    printTheChart(responseFromAPI.data, 'bpi') // <== call the function here where you used to console.log() the response

    maxValue.innerText = Math.max(
      ...getMinMaxValues(responseFromAPI, 'bpi')
    ).toFixed(2)
    minValue.innerText = Math.min(
      ...getMinMaxValues(responseFromAPI, 'bpi')
    ).toFixed(2)
  })
  .catch((err) => console.log('Error while getting the data: ', err))

toInput.addEventListener('change', () => {
  axios
    .get(getDatesUrl())
    .then((responseFromAPI) => {
      console.log(responseFromAPI.data)
      printTheChart(responseFromAPI.data, 'bpi') // <== call the function here where you used to console.log() the response

      maxValue.innerText = Math.max(
        ...getMinMaxValues(responseFromAPI, 'bpi')
      ).toFixed(2)
      minValue.innerText = Math.min(
        ...getMinMaxValues(responseFromAPI, 'bpi')
      ).toFixed(2)
    })
    .catch((err) => console.log('Error while getting the data: ', err))
})

currencyInput.addEventListener('change', () => {
  axios
    .get(getCurrencyUrl())
    .then((responseFromAPI) => {
      console.log(responseFromAPI.data)
      printTheChart(responseFromAPI.data, 'bpi') // <== call the function here where you used to console.log() the response

      maxValue.innerText = Math.max(
        ...getMinMaxValues(responseFromAPI, 'bpi')
      ).toFixed(2)
      minValue.innerText = Math.min(
        ...getMinMaxValues(responseFromAPI, 'bpi')
      ).toFixed(2)
    })
    .catch((err) => console.log('Error while getting the data: ', err))
})

function getMinMaxValues(apiData, key) {
  const dailyData = apiData.data[key]
  const stockPrices = Object.keys(dailyData)
  const dailyPrice = stockPrices.map((price) => dailyData[price])

  return dailyPrice
}

function getCurrencyUrl() {
  const curency = currencyInput.value
  const toValue = toInput.value
  const fromValue = fromInput.value

  if (fromValue != '') {
    const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${curency}&start=${fromValue}&end=${toValue}`
    return apiUrl
  } else {
    const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${curency}`
    return apiUrl
  }
}

function getDatesUrl() {
  const toValue = toInput.value
  const fromValue = fromInput.value
  // console.log(`FROM: ${fromValue} / TO: ${toValue}`)
  const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromValue}&end=${toValue}`
  return apiUrl
}

function printTheChart(stockData, key) {
  const dailyData = stockData[key]

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
  })
}
