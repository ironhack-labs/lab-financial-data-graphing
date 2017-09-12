function getDataAjax(startDate, endDate, currency) {
  $.ajax({
    url: 'https://api.coindesk.com/v1/bpi/historical/close.json?start=' + startDate + '&end=' + endDate + '&currency=' + currency,
    method: 'GET',
    success: function(response) {
      var x = JSON.parse(response);
      ctx = document.getElementById("myChart").getContext('2d');
      myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: Object.keys(x.bpi),
              datasets: [{
                  label: 'BPI',
                  data: Object.values(x.bpi),
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
              responsive: false,
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:false
                      }
                  }]
              }
          }
      });

      // myChart.data.labels = Object.keys(x.bpi);
      // myChart.data.datasets[0].data = Object.values(x.bpi);
      // console.log(x);
      // console.log(Object.keys(x.bpi));
      // console.log(Object.values(x.bpi));
    },
    error: function(err) {
      console.log(err);
    }
  });
}

$('document').ready(function() {
  $('.financial-data-load').on('click', function() {
    console.log('clicked');
    getDataAjax($('#startDate').val(), $('#endDate').val(), $('#currency').val());
  });

  var ctx = document.getElementById("myChart").getContext('2d');
});
