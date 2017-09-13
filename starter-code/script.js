/*jshint esversion:6*/

function getDatafrom(urlQuery) {
  $.ajax({
    url: `http://api.coindesk.com/v1/bpi/historical/close.json`+urlQuery,
    method: "GET",
    success: function(response) {
      var json = $.parseJSON(response);
      var labels = Object.keys(json.bpi);
      var bpi = Object.values(json.bpi);
      $("#min-val").text('Min value: ' + Math.min.apply(null, bpi));
      $("#max-val").text('Max value: ' + Math.max.apply(null, bpi));
      var ctx = $("#myCanvas");
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Bitcoin Price Index',
            data: bpi,
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
                beginAtZero: false
              }
            }]
          }
        }
      });
    },
    error: function(err) {
      console.log(err);
    },
  });
}

$("#date1").on("change", function(){
  event.preventDefault();
  const startDate = $("#date1").val();
  const endDate = $("#date2").val();
  getDatafrom(`?start=${startDate}&end=${endDate}`);
});



$("#date2").on("change", function(){
  event.preventDefault();
  const startDate = $("#date1").val();
  const endDate = $("#date2").val();
  getDatafrom(`?start=${startDate}&end=${endDate}`);
});

$("#currency").on("change", function(){
  event.preventDefault();
  const currency = $("#currency").val();
  getDatafrom(`?currency=${currency}`);
});

$(document).on("ready", function(){
  $("#date2").val($.now());
});
