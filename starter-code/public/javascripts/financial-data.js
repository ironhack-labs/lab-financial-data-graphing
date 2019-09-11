const from = document.querySelector("#from")
const to = document.querySelector("#to")



from.onchange = () => getData(from.value, to.value)
to.onchange = () => getData(from.value, to.value)

const getData = async (from, to) => {
  try {
    const response = await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}`)
    setChartValues(response.data.bpi)
    console.log(response.data)
  } catch (err) {
    console.log(`There was an error: ${err}`)
  }
}

const getHistoricalData = async () => {
  try {
    const response = await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json`)
    setChartValues(response.data.bpi)
    console.log(response.data)
  } catch (err) {
    console.log(`There was an error: ${err}`)
  }
}

const setChartValues = bcData => {
  const date = Object.keys(bcData)
  const vals = Object.values(bcData)

  const ctx = document.querySelector('canvas').getContext('2d')
  new Chart(
    ctx,
    {
      type: 'line',
      data: {
        labels: date,
        datasets: [{
          label: "Bitcoin evolution",
          backgroundColor: '#58D68D',
          borderColor: "#34495E",
          data: vals,
        }]
      }
    }
  )
}

getHistoricalData()
