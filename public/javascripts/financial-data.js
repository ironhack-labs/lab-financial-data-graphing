const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";
let startDate
let endDate

const renderData = (url, start, end) => {
  if (start && end) {
    url = `${url}?start=${start}&end=${end}`
  }
  axios.get(url)
    .then((response) => {
      console.log(url)
      const { data } = response
      const xAxis = Object.keys(data["bpi"]);
      const yAxis = Object.values(data["bpi"]);
      renderChart(xAxis, yAxis)
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
            labelString: 'BPI'
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

renderData(apiUrl)

//Iteration3
const startDateInput = document.getElementById('start-date')
const endDateInput = document.getElementById('end-date')

startDateInput.addEventListener('change', () => {
  startDate = startDateInput.value
  console.log(startDate, endDate)
  renderData(apiUrl, startDate, endDate)
})
endDateInput.addEventListener('change', () => {
  endDate = endDateInput.value
  console.log(startDate, endDate)
  renderData(apiUrl, startDate, endDate)
})

console.log(startDate)

