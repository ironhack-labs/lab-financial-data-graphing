// Data Stored
let datesArr = []
let bpiArr = []

const getRequest = async () => {
  let url = `http://api.coindesk.com/v1/bpi/historical/close.json`
  const start = document.querySelector('#from').value
  const end = document.querySelector('#to').value
  if (start && end) {
    datesArr = []
    bpiArr = []
    url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`
  }
  console.log(url)

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

  const response = await axios.get(url)
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

getRequest()
