// Initial load
axios
        .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
        .then(responseApi => {
            const bitcoinValue = responseApi.data.bpi
            const dates = Object.keys(bitcoinValue)
            const values = Object.values(bitcoinValue)
            const minPrice = Math.min(...values)
            const maxPrice = Math.max(...values)
            document.getElementById("min").innerText = minPrice
            document.getElementById("max").innerText = maxPrice
            printTheChart(dates,values)
        })
        .catch(err => console.log(err))

const getBitcoinValue = () => {
    const startDate = document.getElementById("start").value
    const endDate = document.getElementById("end").value
    const currency = document.getElementById("currency").value
    axios
        .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
        .then(responseApi => {
            const bitcoinValue = responseApi.data.bpi
            const dates = Object.keys(bitcoinValue)
            const values = Object.values(bitcoinValue)
            const minPrice = Math.min(...values)
            const maxPrice = Math.max(...values)
            document.getElementById("min").innerText = minPrice
            document.getElementById("max").innerText = maxPrice
            printTheChart(dates,values)
        })
        .catch(err => console.log(err))
}

function printTheChart(dates,values) {
    const ctx = document.getElementById('bitcoin-canvas').getContext('2d');
    ctx.clearRect(0, 0, 700, 400);
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Stock Chart',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: values
          }
        ]
      }
    }); // closes chart = new Chart()
  } // closes printTheChart()

document.getElementById('canvas-update').addEventListener('click', () => {
    getBitcoinValue();
});