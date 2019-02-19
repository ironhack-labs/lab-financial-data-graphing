axios.get('http://api.coindesk.com/v1/bpi/historical/close.json').then(chartData=>{
  makeChart(chartData);  
})

function changeDate(){
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;

  axios.get('http://api.coindesk.com/v1/bpi/historical/close.json?start=' + start+"&end=" + end).then(chartData=>{
    makeChart(chartData);  
  })
}


function makeChart(chartData){
  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: Object.keys(chartData.data.bpi),
          datasets: [{
              label: '# of Votes',
              data: Object.values(chartData.data.bpi),
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
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
}
