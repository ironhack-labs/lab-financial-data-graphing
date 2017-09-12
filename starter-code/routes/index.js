$("#dataButton").on('click', function() {
  const Dates = getDate()
  getFinancialInfo(Dates);
});

function getDate() {
const dateInfo = {
  date1: $("#firstDate").val(),
  date2: $("#secondDate").val(),
}
return dateInfo;
}

function getFinancialInfo(id) {
  $.ajax({
    url: `http://api.coindesk.com/v1/bpi/historical/close.json?start=${id.date1}&end=${id.date2}` ,
    method: "GET",
    success: function(response) {
      const responseJson = JSON.parse(response);
      console.log(responseJson.bpi);
      const valuesAxisX = Object.keys(responseJson.bpi)
      const valuesAxisY = Object.values(responseJson.bpi)
      console.log(valuesAxisX)
      console.log(valuesAxisY)
      const ctx = $("#ctx")
      let chart = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [{
            data: valuesAxisY,
          }],
          labels: valuesAxisX,
        },
      });
    },
    error: function(err) {
      console.log(err);
    },
  });
}
