const ctx = document.getElementById('myChart').getContext('2d')


window.onload = function() {
  const error = document.getElementById('err')
  const from = document.getElementById('from')
  const to = document.getElementById('to')
  const currency = document.getElementById('currency')
  const min = document.getElementById('min')
  const max = document.getElementById('max')

  from.addEventListener('input', () => {
    if (to.value > from.value) {
      getData(from.value, to.value, currency.value)
      error.innerHTML = ''
    } 
    else error.innerHTML = "The end date can't be before start date."
  })

  to.addEventListener('input', () => {
    if (to.value > from.value) {
      getData(from.value, to.value, currency.value)
      error.innerHTML = ''
    } 
    else error.innerHTML = "The end date can't be before start date."
  })

  currency.addEventListener('input', () => getData(from.value, to.value, currency.value))

  getData()
}

function getData(from, to, currency='USD') {

  let url = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`

  if(from && to) {
    url += `&start=${from}&end=${to}`
  }

  axios.get(url)
      .then(res=> {
        const data = res.data.bpi
        console.log(Object.keys(data))
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
          backgroundColor: [
            'lightgray'
          ],
          borderColor: [
            'gray',
          ],
          borderWidth: 2,
          label: 'Bitcoin Price Index',
          data: Object.values(data)           
        }]
    }
  })
}