// Data Stored
const datesArr = []
const bpiArr = []

// Setting the base URL for axios
const historicalBpiReq = axios.create({
  baseURL: `http://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2014-09-01`
})

// Data options for Graph.js
const data = {
  labels: datesArr, // ['2019-08-11', '2019-08-12', ...]
  datasets: [
    {
      label: 'Bitcoin Price Index',
      data: bpiArr // [1234, 1234, ...]
    }
  ]
}

// Options for Graph.js
const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
}

// Async function to consume the API
const getHistorialBpi = async () => {
  const response = await historicalBpiReq.get()
  for (const date in response.data.bpi) {
    datesArr.push(date)
  }
  for (const bpi in response.data.bpi) {
    bpiArr.push(response.data.bpi[bpi])
  }
  // Graph.js
  const ctx = document.querySelector('#myChart')
  const myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
  })
}

getHistorialBpi()
