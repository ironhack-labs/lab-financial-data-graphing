
let to = document.getElementById("to").value
let from = document.getElementById("from").value


axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}`)
  .then(data => printTheChart(data.data.bpi))

  .catch(err => console.log(err))

    
  document.getElementById("update").onclick = () => {
    
      to = document.getElementById("to").value
      from = document.getElementById("from").value

      axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}`)
      .then(data => printTheChart(data.data.bpi))
  }



  const printTheChart = stockData => {

    const stockLabels = Object.keys(stockData)
    const stockPrice = Object.values(stockData)


    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: stockLabels,
            datasets: [{
                label: "BTC/USD Chart",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: stockPrice,
            }]
        }
    });
};
