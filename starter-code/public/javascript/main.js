var myUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`;
$("#myForm").on("submit", function(event)  {
  event.preventDefault();
  var startingDate = $("#start").val();
  var endingDate = $("#end").val();
  if (startingDate === undefined || endingDate === undefined) {
    myUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`;
  } else {
    myUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startingDate}&end=${endingDate}`;
  }
  $.ajax({

    url: myUrl,
    method: "GET",
    // data: "In case we need to send data**" ,
    success: function (response) {
      //The callback function that will be executed if the request is completed succesfully
      //This function will have a parameter with the server response.
      firstCall.abort();
      var ctx = $("#canvas");
      objResponse = JSON.parse(response);
      var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: Object.keys(objResponse.bpi),
        datasets: [
            {
                label: "Coindesk",
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
                data: Object.values(objResponse.bpi),
                spanGaps: false,
            }
        ]
      }
      });
      },
    error: function (err) {
    //The callback function that will be executed if the request fails, whether it was a client or a server error
    //It will have a parameter with error that caused the request to fail
    console.log(err);
    },
  });

});
var firstCall = $.ajax({

  url: myUrl,
  method: "GET",
  // data: "In case we need to send data**" ,
  success: function (response) {
    //The callback function that will be executed if the request is completed succesfully
    //This function will have a parameter with the server response.

    var ctx = $("#canvas");
    objResponse = JSON.parse(response);
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
      labels: Object.keys(objResponse.bpi),
      datasets: [
          {
              label: "Coindesk",
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
              data: Object.values(objResponse.bpi),
              spanGaps: false,
          }
      ]
    }
    });
    },
  error: function (err) {
  //The callback function that will be executed if the request fails, whether it was a client or a server error
  //It will have a parameter with error that caused the request to fail
  console.log(err);
  },
});
