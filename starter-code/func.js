


axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
    .then(response=>{
      console.log(response.data)
      printTheChart(response.data)
  
    })
    .catch(e=>{
      console.log(e)
    })
  
  
  
  let printTheChart = ((stockData) => {
      let stockLabels = stockData.map( element => element.date);
      let stockPrice = stockData.map( element => element.close);
      let ctx = document.getElementById('canvas').getContext('2d');
      let chart = new Chart(ctx, {
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
  });