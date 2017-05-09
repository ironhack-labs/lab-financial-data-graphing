$(document).ready(()=>{






  $('#sentDates').on('click', (event) => {
    // Create an object with data to submit

      var start_date = $('#start_date').val();
      var end_date = $('#end_date').val();
    console.log("click")
    $.ajax({
      url: 'http://api.coindesk.com/v1/bpi/historical/close.json?start=' + start_date + '&end=' + end_date,
      method: "GET",
      success: function (response) {
        // console.log(response);
        var xChart = [];
        var yChart = [];

        var data = JSON.parse(response)
        for (var date in data.bpi) {

          xChart.push(date);
          yChart.push(data.bpi[date]);
        }
        console.log('xChart', xChart);
        console.log('yChart', yChart);

        var ctx = document.getElementById('myChart');
               var myChart = new Chart(ctx, {
                   type: 'line',
                   data: {
                       labels: xChart,
                       datasets: [{
                           label: 'Historical Trends',
                           data: yChart,
                           backgroundColor: [
                               'rgba(255, 99, 132, 0.2)',
                               'rgba(54, 162, 235, 0.2)',
                               'rgba(255, 206, 86, 0.2)',
                               'rgba(75, 192, 192, 0.2)',
                               'rgba(153, 102, 255, 0.2)',
                               'rgba(255, 159, 64, 0.2)',
                           ],
                           borderColor: [
                               'rgba(255,99,132,1)',
                               'rgba(54, 162, 235, 1)',
                               'rgba(255, 206, 86, 1)',
                              ' rgba(75, 192, 192, 1)',
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
      },
      error: function (err) {
        console.log(err);
      },
    });
  })

  $('')
}); //document.ready
