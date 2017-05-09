var selectedCurrency = $("#currency").val();
var myUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${selectedCurrency}`;
var firstCall = $.ajax({
  url: myUrl,
  method: "GET",
  success: function(response) {
    valuesRendering(response);
    chartRendering(response);
  },
  error: function(err) {
    console.log(err);
  }
});

$("#myForm").on("submit", function(event)  {
  event.preventDefault();
  var startingDate = $("#start").val();
  var endingDate = $("#end").val();
  selectedCurrency = $("#currency").val();
  if (startingDate === undefined || endingDate === undefined) {
    myUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${selectedCurrency}`;
  } else {
    myUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${selectedCurrency}&?start=${startingDate}&end=${endingDate}`;
  }
  $.ajax({
    url: myUrl,
    method: "GET",
    success: function(response) {
      valuesRendering(response);
      chartRendering(response);
      firstCall.abort();
    },
    error: function(err) {
      console.log(err);
    }
  });
});
var chartRendering = function(response) {
  var ctx = $("#canvas");
  var objResponse = JSON.parse(response);
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
};

var valuesRendering = function(response) {
  var objResponse = JSON.parse(response);
  var minValue = Math.min.apply(null, Object.values(objResponse.bpi));
  var maxValue = Math.max.apply(null, Object.values(objResponse.bpi));
  $("#minVal").html(minValue);
  $("#maxVal").html(maxValue);
};
