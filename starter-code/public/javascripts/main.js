$(document).ready(function(){

$('#date-form').on('input', (event) => {
  event.preventDefault();

  // const updateInfo = {
  //   name: $('#update-name-input').val(),
  //   occupation: $('#update-occupation-input').val(),
  //   weapon: $('#update-weapon-input').val()
  // };

  // The character ID that we will plug into the API's URL
  var startDate = $('#start-date').val();
  var endDate = $('#end-date').val();
  var currency = $('#currency-select').val();

  console.log(currency);


  $.ajax({
    url: `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`,
    method: "GET",
    success: function (response) {
      // console.log(response);
      array = JSON.parse(response);

      console.log(Object.keys(array.bpi));
      console.log(Object.values(array.bpi));

      var datesObject = Object.keys(array.bpi);
      var valuesObject = Object.values(array.bpi);

      var ctx = $("#myChart");
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            // X AXIS
            labels: datesObject,
            datasets: [
                {
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
                    //Y AXIS
                    data: valuesObject,
                    spanGaps: false,
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        
                    }
                }]
            }
        }
    });
    },
    error: function (err) {
      console.log(err);
      //The callback function that will be executed if the request fails, whether it was a client or a server error
      //It will have a parameter with error that caused the request to fail
    },
  });
});
  // var datesArray = Object.values(datesObject);
  // console.log(datesArray);




});
