$(document).ready(function () {
  createCustomDateChart($('#start').val(), $('#end').val());
})
$("#start").datepicker({
  dateFormat: 'yy-mm-dd'
});
$("#end").datepicker({
  dateFormat: 'yy-mm-dd'
});

$("input[type='text']").change(function () {
  createCustomDateChart($('#start').val(), $('#end').val());
});
$('select#currency').on('change', function () {
  createCustomDateChart($('#start').val(), $('#end').val());
});

function createCustomDateChart(start, end) {
  var xAxis = [];
  var yAxis = [];
  var highest = [0];
  var lowest = [20000];
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?currency=${$('#currency').val()}&start=${start}&end=${end}`)
    .then((response) => {
      for (var dayKey in response.data.bpi) {
        $('#data').append(`<li>${dayKey}  ---->  ${response.data.bpi[dayKey]}</li>`)
        xAxis.push(dayKey);
        yAxis.push(response.data.bpi[dayKey]);
        if (response.data.bpi[dayKey] > highest[0]) {
          highest[0] = response.data.bpi[dayKey];
          highest[1] = dayKey;
        }
        if (response.data.bpi[dayKey] < lowest[0]) {
          lowest[0] = response.data.bpi[dayKey];
          lowest[1] = dayKey;
        }
      }
      $('#highestVal').text(highest[1] + " --> " + highest[0] + " " + $('#currency').val());
      $('#lowestVal').text(lowest[1] + " --> " + lowest[0] + " " + $('#currency').val());
      var ctx = document.getElementById('customChart').getContext('2d');
      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
          labels: xAxis,
          datasets: [{
            label: "Bitcoin data",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: yAxis,
          }]
        },
        // Configuration options go here
        options: {}
      });
    })
}