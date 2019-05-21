const ctx = document.getElementById('chart').getContext('2d');


const bitCoinData = (startDate, endDate) => {
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
    .then(response => {
      // console.log(response.data)
      // const data = response.data.bpi
      // const date = Object.keys(response.data)
      // const value = Object.values(response.data)

      printTheChart(response)
    })
    .catch(err => {
      console.log(err)
    })
}
bitCoinData('2016-12-01', '2017-02-05')

 const printTheChart = response => {
   console.log(response.data)
   const bpi = response.data.bpi
   const date = Object.keys(response.data.bpi)
   const value = Object.values(response.data.bpi)

   new Chart(ctx, {
     type: 'line',
     data: {
       labels: date,
       datasets: [{
         label: "Stock Chart",
         backgroundColor: 'rgb(255, 99, 132)',
         borderColor: 'rgb(255, 99, 132)',
         data: value,
       }]
     }
   })
  }

  document.getElementById("submitDates").onclick = () => {
    const from = document.getElementById("from").value
    const to = document.getElementById("to").value
    bitCoinData(from,to)
  }