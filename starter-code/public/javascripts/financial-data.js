const start = document.querySelector("#start")
const end = document.querySelector("#end")
let startDate = start.value
let endDate = end.value
let dataArr = []
let dates = []
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
  axios.get((`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`))
    .then(({ data: { bpi } }) => {
      dataArr = Object.values(bpi)
      dates = Object.keys(bpi)
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: 'Price of Bitcoin',
            data: dataArr
          }]
          ,
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        }
      })
    })
  function changeDate() {
    axios.get((`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`))
      .then(({ data: { bpi } }) => {
        dataArr = Object.values(bpi)
        dates = Object.keys(bpi)
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: dates,
            datasets: [{
              label: '# of Votes',
              data: dataArr
            }]
            ,
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          }
        })
      })
  }