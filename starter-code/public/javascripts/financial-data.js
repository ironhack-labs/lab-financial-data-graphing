let bitcoinDate;
let bitcoinPrices;

let dateStart = document.getElementById('dateStart')
let dateEnd = document.getElementById('dateEnd')


axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${dateStart}&end=${dateEnd}`)
.then((res) => {
   console.log(res)
   const data= res.data.bpi
   console.log(data);
   bitcoinDate = Object.keys(data)
   bitcoinPrices = Object.values(data)
   printTheChart(bitcoinDate, bitcoinPrices)
})





const printTheChart = (bitcoinDate, bitcoinPrices) => {
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: bitcoinDate,
      datasets: [{
        label: "Stock Chart",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: bitcoinPrices,
      }]
    }
  });
}


