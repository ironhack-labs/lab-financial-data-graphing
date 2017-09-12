function getFinancialInfo(id) {
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json" + id,
    method: "GET",
    success: function (response) {
      console.log(response);
    },
    error: function (err) {
      console.log(err);
    },
  });
}

$("#dataButton").on('click', function(){
  getFinancialInfo(1);
});
