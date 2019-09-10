let coinDeskApi = axios.create({
  baseURL: 'https://api.coindesk.com/v1/bpi/historical/close.json'
})

const printTheChart = data => {
  const dateLabels = Object.keys(data.bpi)
  const valuePoints = Object.values(data.bpi)
  const maxVal = Math.max.apply(null, valuePoints)
  const minVal = Math.min.apply(null, valuePoints)
  const ctx = document.getElementById('myChart').getContext('2d')
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dateLabels,
      datasets: [
        {
          label: 'Bitcoin Price Index (BPI)    Min=' + minVal + ' Max=' + maxVal,
          backgroundColor: '#98CFE9',
          borderColor: '#8B8B8B',
          data: valuePoints
        }
      ]
    }
  })
}

const getFinancials = data => {
  coinDeskApi
    .get(data)
    .then(responseFromAPI => {
      printTheChart(responseFromAPI.data)
      //console.log('Response from API is: ', responseFromAPI.data)
    })
    .catch(err => {
      console.log('Error is: ', err)
    })
}

const updateForm = () => {
  const fromDate = document.getElementById('fromDate').value
  const toDate = document.getElementById('toDate').value
  const currencySelector = document.getElementById('currency')
  const currencySelected = currencySelector.options[currencySelector.selectedIndex].value

  //API Parameters
  //Currencies: ?index=[USD/CNY]
  //Timeframe: ?start=<VALUE>&end=<VALUE>
  //http://api.coindesk.com/v1/bpi/historical/close.json?currency=EUR&start=2018-09-01&end=2019-09-06

  if (fromDate === '' || toDate === '') {
    coinDeskApi = axios.create({
      baseURL: 'https://api.coindesk.com/v1/bpi/historical/close.json?currency=' + currencySelected
    })
    getFinancials()
  } else {
    coinDeskApi = axios.create({
      baseURL:
        'https://api.coindesk.com/v1/bpi/historical/close.json?currency=' +
        currencySelected +
        '&start=' +
        fromDate +
        '&end=' +
        toDate
    })
    getFinancials()
  }
}

updateForm()
document.getElementById('updateBtn').onclick = updateForm
