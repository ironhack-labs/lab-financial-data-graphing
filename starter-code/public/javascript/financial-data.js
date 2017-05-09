$( document ).ready (
  function getCoinData() {
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json",
    method: "GET",
    success: function (response) {
      var valuesArray = [];
      var dates = [];
      response = JSON.parse(response);
      for (var time in response.bpi) {
        valuesArray.push(response.bpi[time]);
        dates.push(time);
      }
      makeChart(dates, valuesArray);
      console.log(dates);

    },
    error: function (err) {
      console.log(err);
    },
  });

});


function makeChart(dates, valuesArray){
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dates,
        datasets: [{
            label: '# of Votes',
            data: valuesArray,
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
                    beginAtZero:false
                }
            }]
        }
    }
});
}
