var keys = [];
var values = [];
$(() => {
  $.ajax({
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
                      beginAtZero:true
                  }
              }]
          }
      }
  });
 
  
  
})
})