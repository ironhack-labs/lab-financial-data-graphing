const getData = () => {
  return axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
    .then(res => {
      return {
        data: res.data.bpi,
        time: res.data.time.updated
      }
    })
    /* .then(res => {
      return Object.keys(res.data), Object.values(res.data)
    }) */
    .catch(e => console.log(e))
}


document.addEventListener('DOMContentLoaded', () => {
  
  getData()
  .then(function (res) {
    let ctx = document.getElementById("myChart").getContext('2d');
    console.log(ctx)
      let chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Object.keys(res.data),
          datasets: [{
            label: "BitCoins",
            backgroundColor: "rgb(3, 169, 244)",
            borderColor: "rgb(63, 81, 181)",
            data: Object.values(res.data)
          }]
        }
      })
    })
})