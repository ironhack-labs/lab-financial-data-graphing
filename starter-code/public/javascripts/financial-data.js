const bitCoinInfo = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
})



bitCoinInfo.get(`/chart`)

  .then(response => {
    printBitCoin(response.data.bpi)
    console.log(response.data.bpi)
  })
  .catch(error => console.log(error))



const printBitCoin = bitData => {

  const stockLabels = Object.keys(bitData)
  const stockPrice = Object.values(bitData)
  const ctx = document.getElementById('chart').getContext('2d');


  new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockLabels,
      datasets: [{
        label: "Stock Chart",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: stockPrice,
      }]
    }
  });
}



