let ctx = document.getElementById("myChart").getContext('2d');



document.addEventListener('change',(e)=>{
  console.log(document.getElementById('from-date').value)
  console.log(document.getElementById('to-date').value)
  let startDate = $("#from-date").val()
  let endDate = $("#to-date").val()
  let currency = $("#currency").val();
  console.log(currency);
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
  .then(res => chart(res.data.bpi))
   
}) 

let endDate = document.getElementById("to-date").value;





const chart = (value) => {
  new Chart(ctx,{
    type: 'line',
    data: {
      labels: Object.keys(value),
      datasets: [{
        label: `BTC PRICE ${currency.value}`,
        data: Object.values(value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then(res => {
    //console.log(res.data.bpi);
    chart(res.data.bpi)
  })

  

