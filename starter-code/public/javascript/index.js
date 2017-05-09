function getFinInfo(id) {
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json" + id,
    method: "GET",
    success: function (response) {

      //console.log(response);
      var obj = jQuery.parseJSON(response);
      //console.log(obj);
      //console.log(obj.bpi);
      var data=obj.bpi;
      var x = Object.keys(obj.bpi);
      var y = Object.values(obj.bpi);
      //console.log(data);
      console.log(x);
      console.log(y);
      ploter(x,y);
  
      console.log("respuesta recogida");
      return data;
    },
    error: function (err) {
      console.log(err);
    },
  });
}

$("#finButton").on('click', function(){
  const data = getFinInfo(1);
  console.log(data);

});
