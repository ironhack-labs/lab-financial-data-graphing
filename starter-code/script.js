function getCoinData(urlQuery) {
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json"+urlQuery ,
    method: "GET",
    success: function (response) {
      let data = response;
      let dataObject = JSON.parse(data)
      let dataKey = Object.keys(dataObject.bpi);
      let dataValue = Object.values(dataObject.bpi)
      var ctx = document.getElementById("myChart");
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: dataKey,
            datasets: [{
                 label: 'Bitcoin Price',
               data: dataValue,
          }]},

          options: {
              tooltips: {
                  mode: 'point'
              }
          }
      })

    },
    error: function (err) {
      console.log(err);
    },
  })
}

var checkDates = function(){
  let startDate = $('#startDate').val();
  let endDate = $('#endDate').val();
  getCoinData("?start="+startDate+"&end="+endDate)
}



$('#startDate').on('change', function(){
checkDates();
});

$('#endDate').on('change', function(){
checkDates();
});
