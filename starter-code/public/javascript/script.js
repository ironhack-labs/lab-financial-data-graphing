$(document).ready(function(){
console.log("Hello");

var start;
var end;

function makeChart(dataArray, labelArray){
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labelArray,
          datasets: [{
              label: 'Price Index',
              data: dataArray,
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
                      beginAtZero:true
                  }
              }]
          }
      }
  });
}

$('#selectDate').on('change', function() {
  start = $("#startDate").val();
  end = $("#endDate").val();
  var url = "http://api.coindesk.com/v1/bpi/historical/close.json?start=" + start + "&end=" + end;
  makeAjax(url);
});
function makeAjax(url){

$.ajax({
  url: url,
  method: "GET",
  success: function (response) {
    let dataArray = [];
    let labelArray = [];
    response = JSON.parse(response)
    console.log(response.bpi);
    for (var time in response.bpi) {
      dataArray.push(response.bpi[time])
    }
    for (var time in response.bpi) {
      labelArray.push(time);
      console.log(time);
    }

    makeChart(dataArray, labelArray);
  },
  error: function (err) {
console.log(err);
  },
});
}
});
