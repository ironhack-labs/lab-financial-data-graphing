function getData(start,end) {
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json?start=" + start + "&end=" + end,
    method: "GET",                                                      //var           var
    dataType: "json",
    success: function (response) {
        console.log(response);
        var key = Object.keys(response.bpi);
        var value = Object.values(response.bpi);
        chartShow(value, key);
    },
    error: function (err) {
      console.log(err);
    },
});
}

 $(".dates").change(function(){
     var start = $('#start').val();
     var end = $('#end').val();
     getData(start,end);
});
