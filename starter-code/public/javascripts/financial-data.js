/*jshint esversion:6*/

function showData(start, end) {
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json?start=" + start + "&end=" + end,
    dataType: 'json',
    method: 'GET',
    success: function(response) {
      console.log(response);
      let key = Object.keys(response.bpi);
      let value = Object.values(response.bpi);
      showChart(key, value);
      console.log(response);
    },
    error: function(err) {
      console.log(err);
    },
  });
}

//
// $("#from").change();
//
//
// showData();

$("input").change(function() {
  var start = $("#from").val();
  var end = $("#end").val();
  showData(start, end);
});

function showChart(key, value) {
  var ctx = document.getElementById("myChart");
  var myLineChart = Chart.Line(ctx, {
    data: {
      labels: key,
      datasets: [{
        label: "My First dataset",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: value,
        spanGaps: false,
      }]
    }
  });
}
