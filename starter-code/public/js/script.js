var ctx = document.getElementById("myChart");
var fromDate = "";
var toDate = "";
var finalUrl = "http://api.coindesk.com/v1/bpi/historical/close.json?";

var currency = "USD";
var loadAjaxData = function(finalUrlParams){
  $.ajax({
    url: finalUrlParams,
    method: "GET",
    success: function (response) {
      var json = JSON.parse(response);
      var data = Object.keys(json.bpi);
      var values = Object.values(json.bpi);
      var maxValue = Math.max.apply(null, values);
      var minValue = Math.min.apply(null, values);
      printMaxAndMin(maxValue, minValue)
      
      console.log(maxValue, minValue)
      return createChart(data, values) ;
    },
    error: function (err) {
      console.log(err);
  //The callback function that will be executed if the request fails, whether it was a client or a server error
  //It will have a parameter with error that caused the request to fail
    },
  })
}

var printMaxAndMin = function(maxNum, minNum) {
  $("#max").html(maxNum);
  $("#min").html(minNum);
  console.log(maxNum, minNum, "ok")
}
var createChart = function (dataValues, realValues) {
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data:{
    labels: dataValues,
    datasets: [{
      label: "bitcoin evo",
      data: realValues,
    }]
  },
  options: {
    scales: {
      yAxes: [{
        stacked: true
      }]
    }
  }
  })
};
$(document).ready(function(){
  $( "#fromDate" ).change(function() {
    finalUrl = "http://api.coindesk.com/v1/bpi/historical/close.json?";
    fromDate = "start=" + $(this).val();
    finalUrl = finalUrl + fromDate + toDate + currency;
    loadAjaxData (finalUrl);
     console.log(finalUrl)
  });
   $( "#toDate" ).change(function() {
    finalUrl = "http://api.coindesk.com/v1/bpi/historical/close.json?";
    toDate = "&end=" + $(this).val();
    finalUrl = finalUrl + fromDate + toDate + currency;
    loadAjaxData (finalUrl);
    console.log(finalUrl)
  });
  $( "#currency" ).change(function() {
    finalUrl = "http://api.coindesk.com/v1/bpi/historical/close.json?"; 
    currency = "&currency=" + $(this).val();
    console.log(currency)
    finalUrl = finalUrl + fromDate + toDate + currency;
    console.log(finalUrl)
    loadAjaxData (finalUrl);
    $(".currency").html($(this).val());
     
   
  });
})

loadAjaxData (finalUrl);
  


