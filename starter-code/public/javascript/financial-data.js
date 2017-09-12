function getDataAjax(startDate, endDate, currency) {
  $.ajax({
    url: 'https://api.coindesk.com/v1/bpi/historical/close.json?start=' + startDate + '&end=' + endDate + '&currency=' + currency,
    method: 'GET',
    success: function(response) {
      var x = JSON.parse(response);
      console.log(x);
      // console.log(Object.keys(response));
    },
    error: function(err) {
      console.log(err);
    }
  });
}

$('document').ready(function() {
  $('.financial-data-load').on('click', function() {
    console.log('clicked');
    getDataAjax('2016-01-01', '2016-03-01', 'USD');
  });
});


// var ctx = document.getElementById("myChart");
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255,99,132,1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
// });
