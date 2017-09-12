
function getDataInfo() {
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json",
    method: "GET",
    success: function(response) {
      console.log(response);
    },
    error: function(err) {
      console.log(err);
    }
  });
}

$("#chartButton").on("click", function() {
  getDataInfo();
});

