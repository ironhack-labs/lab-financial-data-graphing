const canvas=document.querySelector("#dataCanvas")
const ctx = canvas.getContext('2d')

  axios.get(('http://api.coindesk.com/v1/bpi/historical/close.json'))
  .then(({data})=>{
    const arrData = Object.values(data.bpi)
    const arrKeys = Object.keys(data.bpi)
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: arrKeys,
          datasets: [{
              label: '# of Votes',
              data: arrData,
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
  }).catch(err=>console.log(err))


