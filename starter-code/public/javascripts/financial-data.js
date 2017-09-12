function getFinancialData(){
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json",
    method: "GET",
    data: "" ,
    success: function (response) {

      var obj = JSON.parse(response);


      var array = [];
      var values = [];
      var labels = [];

      $.each(obj.bpi, function(x,y){
        array.push({x,y});
        values.push(y);
        labels.push(x);


      });
      console.log(array);

      var ctx = document.getElementById("myChart").getContext('2d');
        var myLineChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{label: "BitcoinIndex", data: array}]
          }
      });






    },
    error: function (err) {
      //The callback function that will be executed if the request fails, whether it was a client or a server error
      //It will have a parameter with error that caused the request to fail
    },
  });
}

$("#createGraph").on("click", function(){
  getFinancialData();
});




//** If the HTTP verb is get, the data will be sent through the query string. If not, it will be sent in the form body.
