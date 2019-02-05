axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then(response => {
    console.log(response.data)
    printChart(response.data)
  })
  .catch(err => {
    next(err)
  })

function printChart(bpiData) {
  const bpiLabels = Object.keys(bpiData.bpi)
  const bpiPrice = Object.values(bpiData.bpi)
  const ctx = document.getElementById('bpiChart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: bpiLabels,
          datasets: [{
              label: "Bpi Chart",
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: bpiPrice,
          }]
      },

      // Configuration options go here
      // options: {}
  });
}

document.getElementById('form-submit').onclick = function() {
  let start = document.getElementById('start').value
  let end = document.getElementById('end').value
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
  .then(response => {
    console.log(response.data)
    printChart(response.data)
  })
  .catch(err => {
    next(err)
  })
}

document.getElementById('cur-select').onchange = function() {
  let cur = document.getElementById('cur-select').value
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?currency=${cur}`)
  .then(response => {
    console.log(response.data)
    printChart(response.data)
  })
  .catch(err => {
    next(err)
  })
}