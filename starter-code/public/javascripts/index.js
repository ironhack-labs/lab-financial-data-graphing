function getBitcoinInfo(startDate, endDate) {
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json?start="+startDate+"&end="+endDate,
    method: "GET",
    success: function (response) {
        let jsonObj = $.parseJSON(response)
        var ctx = document.getElementById("myChart");
        let specificDate = Object.keys(jsonObj.bpi);
        let bitcoinValue = Object.values(jsonObj.bpi);
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: specificDate,
                datasets: [{
                    label: 'Bitcoin Value',
                    data: bitcoinValue,
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:false
                        }
                    }]
                }
            }
        });

    },
    error: function (err) {
      console.log(err);
    },
  })
}

  $("#endDate, #startDate").on('change', function(){
    const startDate = $("#startDate").val();
    const endDate = $("#endDate").val();
    if ( startDate != "" && endDate != "") {
        getBitcoinInfo(startDate, endDate)
      }
      else {
          console.log("Please select start and end date.")
      }
  })