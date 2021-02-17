const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";
let startDate
let endDate
let currentCurrency = 'USD'
let minValue
let maxValue

const renderMaxMin = (minValue, maxValue) => {
  document.getElementById('min-value').innerHTML = `${minValue} ${currentCurrency}`
  document.getElementById('max-value').innerHTML = `${maxValue} ${currentCurrency}`
}

const renderData = (url, start, end, currentCurrency) => {
  if (start && end) {
    url = `${url}?start=${start}&end=${end}&currency=${currentCurrency}`
  } else {
    url = `${url}?currency=${currentCurrency}`
  }

  axios.get(url)
    .then((response) => {
      const { data } = response
      const xAxis = Object.keys(data["bpi"]);
      const yAxis = Object.values(data["bpi"]);
      minValue = Math.min(...yAxis).toFixed(2)
      maxValue = Math.max(...yAxis).toFixed(2)
      renderChart(xAxis, yAxis)
      renderMaxMin(minValue, maxValue)
    })
    .catch((error) => {
      console.log(error)
    })
}

const renderChart = (xAxis, yAxis) => {
  const ctx = document.getElementById("myChart").getContext("2d")

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xAxis,
      datasets: [{
        label: 'Bitcoin Price Index (BPI)',
        borderColor: 'gray',
        data: yAxis,
        backgroundColor: 'transparent',
        lineTension: 0.1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: `BPI ${currentCurrency}`
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Date'
          }
        }]
      }
    }
  })
}

renderData(apiUrl, startDate, endDate, currentCurrency)



const startDateInput = document.getElementById('start-date')
const endDateInput = document.getElementById('end-date')
const currentCurrencyInput = document.getElementById('current-currency')

startDateInput.addEventListener('change', () => {
  startDate = startDateInput.value
  renderData(apiUrl, startDate, endDate, currentCurrency)
})
endDateInput.addEventListener('change', () => {
  endDate = endDateInput.value
  renderData(apiUrl, startDate, endDate, currentCurrency)
})

currentCurrencyInput.addEventListener('change', () => {
  currentCurrency = currentCurrencyInput.value
  renderData(apiUrl, startDate, endDate, currentCurrency)
})


