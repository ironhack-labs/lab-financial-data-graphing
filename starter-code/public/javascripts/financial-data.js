const stockInfo  = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical'
  });

const printTheChart = (stockData => {
    let stockLabels = [];
    let stockPrice = [];

  for(data in stockData.bpi) {

    stockLabels.push(data);

    stockPrice.push(stockData.bpi[data]);
  }  


  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
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
window.onload= function() {
    stockInfo.get('close.json')
    .then(response => {
        //console.log(response);
        printTheChart(response.data);
    })
    .catch( error => {
        console.log(error);
    });
};
  


document.getElementById('bFilter').onclick = () => {
    let start = document.getElementById('start').value
    let end = document.getElementById('end').value
    let currency = document.getElementById('currency').value
    stockInfo.get(`close.json?start=${start}&end=${end}&currency=${currency}`)
    .then(response => {
        printTheChart(response.data);
    })
    .catch( error => {
        console.log(error);
    });
}