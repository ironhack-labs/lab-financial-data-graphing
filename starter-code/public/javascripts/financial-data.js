
  document.getElementById("coin").addEventListener("change", getInfo);
  document.getElementById("start").addEventListener("change", getInfo);
  document.getElementById("end").addEventListener("change", getInfo);

  function getInfo(){
    let start = document.getElementById('start').value;
    let end = document.getElementById('end').value;
    let select = document.getElementById("coin").value
    console.log(start, end, select)
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&index=[USD/CNY]&currency=${select}`)
    .then (res =>{
        console.log(res.data)
        printTheChart(res.data);
    })
}

  let printTheChart = ((stockData) => {
    let  stockPrice = Object.values(stockData.bpi);
    let stockLabels =  Object.values(Object.keys(stockData.bpi));
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
      type: 'line',
      // The data for our dataset
      data: {
        labels: stockLabels,
        datasets: [{
          label: "Bitcoin Price Index",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(155, 299, 132)',
          data: stockPrice,
        }]
      }
    });
  });
