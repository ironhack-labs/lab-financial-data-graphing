

const getData = () => {
    return axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    .then( res => {
        printTheChart(res.data.bpi)    
    }).catch(e => console.log(e));
}

let printTheChart = ((datos) => {
    
    let stockLabels = Object.keys(datos)
    let stockPrice = Object.values(datos)
    let ctx = document.getElementById('myChart').getContext('2d');
    
    let chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: stockLabels,
        datasets: [{
          label: "Bicoin Price Index",
          backgroundColor: 'rgb(234, 242, 255)',
          borderColor: 'rgb(165, 217, 255)',
          data: stockPrice,
        }]
      }
    });
  });

 getData()

    
  