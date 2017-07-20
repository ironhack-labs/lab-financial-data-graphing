function getBitcoinInfo() {
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json",
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
    console.log(info);
    var keys = [];
    var values = [];
    for (var key in info) {
        keys.push(key);
        values.push(info[key]);
    }
    return [ keys, values ];
}