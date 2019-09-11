
let datesArr = [ ]
let bpiArr = [ ]

const historicalBpiReq = axios.create({
  baseURL: `http://api.coindesk.com/v1/bpi/historical/close.json`
})

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

  const data = {
    labels: datesArr, 
    datasets: [ {label: 'Bitcoin Price Index',data: bpiArr }
    ]
  }

const options = {scales: {yAxes: [
{ticks: {beginAtZero: true} }] }}

const response = await axios.get(url)
for (const date in response.data.bpi) {
 datesArr.push(date)
  }
  for (const bpi in response.data.bpi) {
    bpiArr.push(response.data.bpi[bpi])
  }

  const ctx = document.querySelector('#myChart')
  const myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
  })
}

getRequest()
