var keys = [];
var values = [];
$(() => {
 function ajaFun() {  $.ajax({
    method: 'GET',
    url: 'http://api.coindesk.com/v1/bpi/historical/close.json',
    success: function(response){
      const data = JSON.parse(response)
      keys = Object.keys(data.bpi);
      values = Object.values(data.bpi);
     },
    error: function(error){console.log(error)}
  }).done(function(){

  
 console.log(keys)
  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: keys,
          datasets: [{
              label: '# of Votes',
              data: values,
              backgroundColor: ['rgba(255, 99, 132, 0.2)'],
              borderColor: ['rgba(255,99,132,1)'],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
    });
  })
 }
$("#btn").on("click", () => {return ajaFun()} )
})