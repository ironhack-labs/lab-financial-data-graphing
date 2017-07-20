$(".values").hide();


function getBitcoinInfo() {

var startDate = $("#startDate").val();
var endDate = $("#endDate").val();
var currency = $("#currency").val();

  if(startDate == "" || endDate == "" ) {
    newDate = new Date();
    endDate = newDate;
    startDate = new Date(newDate.getTime() - 2658701000);
    endDate = endDate.getFullYear() + "-" + ("0" + (endDate.getMonth() + 1)).slice(-2) + "-" + endDate.getDate();
    startDate = startDate.getFullYear() + "-" + ("0" + (startDate.getMonth() + 1)).slice(-2) + "-" + startDate.getDate();
  }


    $.ajax({
      url: `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`,
      method: "GET",
      success: function (response) {
          var data = JSON.parse(response).bpi;
          var render = getData(data);  
          generateChart(render);
      },
      error: function (err) {
        console.log(err);
      },
    })
}

$("#getInfo").on('click', function(){
  getBitcoinInfo();
})


function getData(info){
  var maxData = -99999;
  var minData = 99999;
    var keys = [];
    var values = [];
    for (var key in info) {
        keys.push(key);
        values.push(info[key]);
        maxData < info[key] ? maxData = info[key] : maxData;
        minData > info[key] ? minData = info[key] : minData;
    }
    $("#maxData").text(maxData);
    $("#minData").text(minData);
    $(".values").show();
    return [ keys, values ];
}