const btn = document.getElementById("btnI")
const max = document.getElementById("max-value");
const min = document.getElementById("min-value");

testFunc = () => {
  const startDate = document.getElementById("start").value;
  const endDate = document.getElementById("end").value;
  const dates = [startDate, endDate];
  
  const stockData = axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${dates[0]}&end=${dates[1]}`)
    .then(response => {
      printTheChart(response.data.bpi);
      const stockPrice = Object.values(response.data.bpi)
      max.innerText = Math.max(...stockPrice);
      min.innerText = Math.min(...stockPrice);
    })
    .catch( error => {
      console.log(error);
      
});
}




const printTheChart = (x) => {
  const stockLabels = Object.keys(x)
  const stockPrice = Object.values(x)
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockLabels,
      datasets: [{
        label: "Bitcoin price",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: stockPrice,
      }]
    }
  });
};

// api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05