//ITERATION 1 and 2
function getFinancialData() {
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json",
    method: "GET",
    dataType: "json",
    success: function (response) {
      console.log(response.bpi);
      var obj = response.bpi;
      var arrCont = Object.keys(obj).map(function (key) { return obj[key]; });
      var arrIndex =Object.keys(response.bpi);
      console.log(arrIndex);
      console.log(arrCont);

      var ctx = document.getElementById("myChart");

      var data = {
          labels: arrIndex,
          datasets: [
              {
                  label: "Line",
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
                  data: arrCont,
                  spanGaps: false,
              }
          ]
      };
      var myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
  });
    },
    error: function (err) {
      console.log(err);
    },
  });
  }
  //////////ITERATION 3/////////////////////////////////////////////////////7
  function getFinancialDataByDate() {
    var initDate = $("#date1").val();
    var endDate = $("#date2").val();
    var currency =$("#currency").val(); //Iteration4
    var urlDates="http://api.coindesk.com/v1/bpi/historical/close.json?start="+initDate+"&end="+endDate+"&currency="+currency;
    console.log(urlDates);
    $.ajax({
      url: urlDates,
      method: "GET",
      dataType: "json",
      success: function (response) {
        console.log(response.bpi);
        var obj = response.bpi;
        var arrCont = Object.keys(obj).map(function (key) { return obj[key]; });
        var arrIndex =Object.keys(response.bpi);
        console.log(arrIndex);
        console.log(arrCont);

        var ctx = document.getElementById("myChart");

        var data = {
            labels: arrIndex,
            datasets: [
                {
                    label: "Line",
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
                    data: arrCont,
                    spanGaps: false,
                }
            ]
        };
        var myLineChart = new Chart(ctx, {
          type: 'line',
          data: data,
    });
      },
      error: function (err) {
        console.log(err);
      },
    });
  }


$("#button").on('click', function(){
  getFinancialData();
});
$("#button2").on('click', function(){
  getFinancialDataByDate();
});
