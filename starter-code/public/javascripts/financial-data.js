const from = document.querySelector('#from')
const to = document.querySelector('#to')
const currency = document.querySelector('#currency')
const minVal = document.querySelector('#min-val')
const maxVal = document.querySelector('#max-val')
const currencyCodeMin = document.querySelector('#curr-code-min')
const currencyCodeMax = document.querySelector('#curr-code-max')

from.onchange = () => getData(from.value, to.value, currency.value)
to.onchange = () => getData(from.value, to.value, currency.value)
currency.onchange = () => {
  if (!from.value || !to.value)
    getHistoricalData(currency.value)
  else
    getData(from.value, to.value, currency.value)
  currencyCodeMin.innerText = currency.value
  currencyCodeMax.innerText = currency.value
}
console.log(from.value, to.value)
const getData = async (from, to, currency) => {
  try {
    const response = await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}&currency=${currency}`)
    setChartValues(response.data.bpi)
  } catch (err) {
    console.log(`There was an error: ${err}`)
  }
}

const getHistoricalData = async (currency) => {
  try {
    const response = await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`)
    setChartValues(response.data.bpi)
  } catch (err) {
    console.log(`There was an error: ${err}`)
  }
}

const setChartValues = bcData => {
  const date = Object.keys(bcData)
  const values = Object.values(bcData)
  minVal.value = Math.min.apply(null, values)
  maxVal.value = Math.max.apply(null, values)
  const ctx = document.querySelector('canvas').getContext('2d')
  new Chart(
    ctx,
    {
      type: 'line',
      data: {
        labels: date,
        datasets: [{
          label: 'Bitcoin value',
          backgroundColor: '#58D68D',
          borderColor: '#34495E',
          data: values,
        }]
      }
    }
  )
}

getHistoricalData(currency.value)