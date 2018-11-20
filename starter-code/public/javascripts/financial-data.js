let startDate;
let endDate;
let myChart;

window.onload = function(){
  $("#data-filter").click(function(){
    startDate = $('#start-date').val();
    endDate = $('#end-date').val();

    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
    .then((result) => {
      updateChart(result);
  });
});

  $("#currency").change(function(){
    startDate = $('#start-date').val();
    endDate = $('#end-date').val();
    let curChoice = $('#currency').val();
  
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${curChoice}`)
    .then((result) => {
      updateChart(result);
    });
  });
};

function updateChart(result){
  let dates = Object.keys(result.data.bpi);
  let values = Object.values(result.data.bpi);
  let max = Math.max.apply(null, values);
  let min = Math.min.apply(null, values); 
  curChoice = $('#currency').val();
  $('#max-value').html(max);
  $('.curr-value').html(curChoice);
  $('#min-value').html(min);

  let ctx = document.getElementById("myChart").getContext('2d');
  if(myChart) myChart.destroy();
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'BPI',
        data: values,
        backgroundColor: [
          'rgba(6,178,167,0.4)',
        ],
        borderColor: [
          'rgba(6,178,176,0.89)',
        ],
        borderWidth: 1,
      }]
    },
    options: 
    {
      responsive: true,
      elements: {
        line: {
          tension: 0, // disables bezier curves
      }
     },
        scales: {
          xAxes: [{
            display: true
        }],
        yAxes: [{
            display: true,
            ticks: {
              beginAtZero:false
          }
        }]    
      }
    }
  });  
}
