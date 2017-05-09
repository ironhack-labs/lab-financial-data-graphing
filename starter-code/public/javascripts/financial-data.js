var ctx = document.getElementById("myChart");
var startDate = document.getElementById("start-date");
var endDate = document.getElementById("end-date");
var currency = document.getElementById("currency");
var minValue = document.getElementById("min-price");
var maxValue = document.getElementById("max-price");
var url = "http://api.coindesk.com/v1/bpi/historical/close.json";

$("#start-date").on("change", function() {
  queryString = makeQueryString();
  showChart(url + queryString);
});

$("#end-date").on("change", function() {
  queryString = makeQueryString();
  showChart(url + queryString);
});

$("#currency").on("change", function() {
  queryString = makeQueryString();
  showChart(url + queryString);
});

function makeQueryString() {
  return "?start="+ startDate.value + "&end=" + endDate.value + "&currency=" + currency.value;
}

function calculateMinValue(values) {
  return Math.min.apply(null, values);
}

function calculateMaxValue(values) {
  return Math.max.apply(null, values);
}

function showChart(url) {
  if (typeof(url) === "undefined") {
    url = "http://api.coindesk.com/v1/bpi/historical/close.json";
  }

    $.ajax({
    url: url,
    method: "GET",
    data: "In case we need to send data**" ,
    dataType: "json",
    success: function (response) {
      console.log(response);
      var dataBpi = response.bpi;
      var bpiKeys = Object.keys(dataBpi);
      var bpiValues = bpiKeys.map(function(key) {
        return dataBpi[key];
      });
      console.log(bpiValues);

        var data = {
            labels: bpiKeys,
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
                    data: bpiValues,
                    spanGaps: false
                }
            ]
        };


    minValue.value = calculateMinValue(bpiValues);
    maxValue.value = calculateMaxValue(bpiValues);

      var myLineChart = new Chart(ctx, {
          type: 'line',
          data: data
      });

    },
    error: function (err) {
      console.log(err);
    },
  });
}

showChart();
