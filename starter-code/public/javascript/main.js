$(document).ready(() => {
  // Instantiate myChart
  var ctx = document.getElementById('myChart')
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'BitCoin Index',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  })

  function getInfoFromForm (form) {
    var returnObject = {}
    form.serializeArray().forEach(function (input) {
      returnObject[input.name] = input.value
    })
    return returnObject
  }

  function callApi (form) {
    // Params for the API
    var endDate = form.endDate || new Date()
    var oneMonthBefore = new Date(endDate)
    oneMonthBefore.setDate(oneMonthBefore.getDate() - 30)
    var startDate = form.startDate || oneMonthBefore
    startDate = startDate < endDate ? startDate : oneMonthBefore
    var currency = form.currency || 'USD'
    var URL = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${moment(startDate).format('YYYY-MM-DD')}&end=${moment(endDate).format('YYYY-MM-DD')}&currency=${currency}`

    $.ajax({
      method: 'GET',
      url: URL,
      success: function (response) {
        // Params for the Graph
        var xData = Object.keys(JSON.parse(response).bpi)
        var yData = Object.values(JSON.parse(response).bpi)

        myChart.data.labels = xData
        myChart.data.datasets[0].data = yData
        myChart.update()

        // Update max and min values for the series
        var maxData = Math.max.apply(null, yData)
        var minData = Math.min.apply(null, yData)
        $('#max-value').html(maxData)
        $('#min-value').html(minData)
      },
      error: function (err) {
        console.log(err)
      },
      datatype: 'json'
    })
  }

  $('input').on('change', (e) => {
    callApi(getInfoFromForm($('#index-form')))
  })

  $('select').on('change', (e) => {
    callApi(getInfoFromForm($('#index-form')))
  })

  callApi(getInfoFromForm($('#index-form')))
})
