
$.ajax({
  url: "http://api.coindesk.com/v1/bpi/historical/close.json",
  method: "GET",
  success: function (response) {
    var aux = $.parseJSON(response);
    var labels = Object.keys(aux.bpi);
    var data = Object.values(aux.bpi);
    renderChart(labels, data);
  },
  error: function (err) {
    console.log(err);
  },
});


function renderChart(labels, data){
  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'Bitcoin Price Index',
              data: data,
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
                      beginAtZero:false
                  }
              }],
              xAxes:      [{
                ticks: {
                    autoSkip: false
                }
            }]
          }
      }
  });
}
