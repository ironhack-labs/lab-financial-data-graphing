
// PRINT CHART 
const printChart = (dates, values) => {
  const ctx = document.getElementById('myChart').getContext('2d')
  const chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [
              {
                  backgroundColor: 'rgba(100, 99, 132, 0.2)',
                  pointBackgroundColor: 'rgba(215, 40, 40, 0.9)',
                  label: 'Bitcoin Chart',
                  data: values
              }
          ]
      }
  })
  console.log()
}


/// API BITCOIN 
const bitcoinData = (startingDate, endingDate) => {
  axios
      .get(
          `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startingDate}&end=${endingDate}`
      )
      .then(response => {
          const { bpi } = response.data
          const dates = Object.keys(bpi)
          const values = Object.values(bpi)
          printChart(dates, values)
      })
      .catch(err => {
          console.error(err)
      })
}
bitcoinData()



//listeners 
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('change', () => {
      let startingDate = document.getElementById('starting-date-input').value
      let endingDate = document.getElementById('ending-date-input').value
       
      bitcoinData(startingDate, endingDate)
  })
})