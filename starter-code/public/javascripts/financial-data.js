axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
.then(response=>{
    printTheChart(response.data.bpi)
    console.log (response)
   
})
.catch(error=>{
    console.log (error)
})
 let printTheChart = ((stockData) => {
    let stockLabels = Object.keys( stockData);
    let stockPrice = Object.values( stockData);
    let ctx = document.getElementById('canvas').getContext('2d');
    let chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: stockLabels,
        datasets: [
          {
          label: "Bitcoin price index",
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderColor: 'rgb(191, 191, 191)',
          data: stockPrice,
        }
      ]
      }
    });
  });