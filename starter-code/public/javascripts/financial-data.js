function getData(){
    let start = document.getElementById('start').value;
    let end = document.getElementById('end').value;
    console.log(start,end)
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
    .then (res =>{
        console.log(res.data)
        printTheChart(res.data);
    })
}




const printTheChart = ((data) => {
  let stockLabels = Object.keys(data.bpi);
  let stockPrice = Object.values(data.bpi);
  let ctx = document.getElementById('myChart').getContext('2d');
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
})
})

getData();