const ctx = document.getElementById('myChart').getContext('2d')

function getData(from, to, currency='USD') {

  let url = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`

  if(from && to) url += `&start=${from}&end=${to}`

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
            label: 'Bitcoin Price Index',
            data: Object.values(data),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    }
  })
}

window.onload = function() {
  const error = document.getElementById('err')
  const from = document.getElementById('from')
  const to = document.getElementById('to')
  const currency = document.getElementById('currency')
  const min = document.getElementById('min')
  const max = document.getElementById('max')

  from.addEventListener('input', e => {
    if (to.value > from.value) {
      getData(from.value, to.value, currency.value)
      error.innerHTML = ''
    } 
    else error.innerHTML = 'Sorry, but your specified end date is before your start date. Please check and try again.'
  })
  
  to.addEventListener('input', e => {
    if (to.value > from.value) {
      getData(from.value, to.value, currency.value)
      error.innerHTML = ''
    } 
    else error.innerHTML = 'Sorry, but your specified end date is before your start date. Please check and try again.'
  })

  currency.addEventListener('input', e => getData(from.value, to.value, currency.value))

  getData()
}
