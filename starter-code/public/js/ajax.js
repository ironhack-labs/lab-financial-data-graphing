/*jshint esversion: 6*/

$(document).ready(() => {

  var startDate;
  var endDate;
  var currency = 'USD';

$('#startDate').datepicker()
  .on('input change', function (e){
    startDate = e.target.value;
    startDate = reorderDates(startDate);
    checkDates(startDate, endDate);
  });

  $('#endDate').datepicker()
    .on('input change', function (e){
      endDate = e.target.value;
      endDate = reorderDates(endDate);
      checkDates(startDate, endDate);
    });

    $('#currencies').change(function (){
        currency = this.value;
        checkDates(startDate, endDate);
      });

function reorderDates (date){
  var newDate = date.split('/');
  var tmp = newDate[0];
  newDate[0] = newDate[2];
  newDate[2] = newDate[1];
  newDate[1] = tmp;
  // newDate = newDate.reverse();
  newDate = newDate.join('-'); // return date.split('/').reverse().join('-') would be the shorthand for this
  return newDate;
}

function checkDates(startDate, endDate){
  if (startDate && endDate) {
    $.ajax({
     method:  'GET',
     url:     'http://api.coindesk.com/v1/bpi/historical/close.json?start='+ startDate +'&end=' + endDate + '&currency=' + currency,
     success: showBitcoin,
     error:   handleError
   });

 }
}

function showBitcoin(response) {
  var responseObject = JSON.parse(response);
  var data = [];
  var label = [];
  for (var key in responseObject.bpi) {
    label.push(key);
    data.push(responseObject.bpi[key]);
  }
  var min = Math.min.apply(0, data);
  var max = Math.max.apply(0, data);

  $("#min").html(min);
  $("#max").html(max);


  var dataNew = {
    labels: label, //rendering the labels from the showBitcoin function
    datasets: [
        {
            label: "Bitcoin sucks",
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
            data: data, //rendering the data we got from the showBitcoin function
            spanGaps: false,
        }
    ]
};

var ctx = document.getElementById('myChart');
var myLineChart = new Chart(ctx, {
    type: 'line',
    data: dataNew,
    options: {}
});
}
});
function handleError(error) {
  console.log(error);
}
