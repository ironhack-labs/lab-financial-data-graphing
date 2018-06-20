



axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
.then (data => {
  printTheChart(data)
})
.catch (error =>{
  console.log(error)
})

document.getElementById("submitButton").onclick = function() {
  let fromDate = document.getElementById("fromDate").value;
  let toDate = document.getElementById("toDate").value;
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`)
  .then (data => {
    printTheChart(data)
  })
  .catch (error =>{
    console.log(error)
  })
}


let printTheChart = ((coinData) => {
  let coinLabels = Object.keys(coinData.data.bpi);
  let coinPrice = Object.values(coinData.data.bpi);
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: coinLabels,
      datasets: [{
        label: "Coin Chart",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: coinPrice,
      }]
    }
  });
});
