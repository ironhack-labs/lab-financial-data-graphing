const ctx = document.getElementById('myChart').getContext('2d')

function setData(startDate, endDate, currency='USD') {

  let url = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`

  if(startDate && endDate) url += `&start=${startDate}&end=${endDate}`

  axios.get(url)
      .then(response => {
        const data = response.data.bpi
        createChart(data)
        
        min.innerHTML = `Min: ${Math.min(...Object.values(data)).toFixed(2)} ${currency}`
        max.innerHTML = `Max: ${Math.max(...Object.values(data)).toFixed(2)} ${currency}`
      })
      .catch(err => console.log(err))
}

function createChart(data) {
  new Chart(ctx, {
    type: 'line',
    data: {
        labels: Object.keys(data),
        datasets: [{
            label: 'Bitcoin Inversionists Heart Attack rates',
            data: Object.values(data),
            backgroundColor: [
                'rgba(0, 44, 177, 0.4)'
            ],
            borderColor: [
                'rgba(0, 44, 177, 1)',
            ],
            borderWidth: 1
        }]
    }
  })
}

window.onload = function() {
  const startDate = document.getElementById('start-date')
  const endDate = document.getElementById('end-date')
  const currency = document.getElementById('currency')
  const max = document.getElementById('max')
  const min = document.getElementById('min')
  const error = document.getElementById('error')

  startDate.addEventListener('input', e => {
    if (endDate.value > startDate.value) {
      setData(startDate.value, endDate.value, currency.value)
      error.innerHTML = ''
    } 
    else error.innerHTML = 'Sorry, check your dates. The starting date must be before the end date.'
  })
  
  currency.addEventListener('input', e => setData(startDate.value, endDate.value, currency.value))
  setData()
}

