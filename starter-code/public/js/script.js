var ctx = document.getElementById("myChart");

var createChart = function (dataValues, realValues) {
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data:{
    labels: dataValues,
    datasets: [{
      label: "bitcoin evo",
      data: realValues,
    }]
  },
  options: {
    scales: {
      yAxes: [{
        stacked: true
      }]
    }
  }
  })
};

$.ajax({
  url: "http://api.coindesk.com/v1/bpi/historical/close.json",
  method: "GET",
  success: function (response) {
    var json = JSON.parse(response);
    var data = Object.keys(json.bpi);
    var values = Object.values(json.bpi);
    return createChart(data, values);
  },
  error: function (err) {
    console.log(err);
//The callback function that will be executed if the request fails, whether it was a client or a server error
//It will have a parameter with error that caused the request to fail
  },
})
