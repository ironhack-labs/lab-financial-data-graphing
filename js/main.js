console.log("js funciona")

const btcApi = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
})

function getBtcInfo() {
  btcApi.get()
  .then(response => {
    console.log(response.data)
    return response.data.bpi;
  })
  .then(response => {
      drawChart(response);
  })

  .catch(err => {
    console.error(err)
  })
}

 
const drawChart = bitcoinPrices => {
    console.log(bitcoinPrices);
    let stockLabels = Object.keys(bitcoinPrices);
    let stockPrice = Object.values(bitcoinPrices);
    console.log(stockLabels)
    console.log(stockPrice)
    let ctx = document.getElementById("myChart").getContext("2d");
    let chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: stockLabels,
          datasets: [
            {
              label: "Stock Chart",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: stockPrice  
            }
          ]
        }
    })
}



getBtcInfo()
