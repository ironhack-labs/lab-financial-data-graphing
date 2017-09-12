function getFinancial() {
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json",
    method: "GET",
    success: function (response) {

     lineChart(response)

    },
    error: function (err) {
      console.log(err);
    },
  })
}

$("#button").on('click', function(){
  getFinancial();
})



function lineChart(response){
  var parse = JSON.parse(response);
  var bpi = parse.bpi;
  var keys = Object.keys(bpi);
  var values = Object.values(bpi);
     console.log(Object.values(bpi))
     console.log(Object.keys(bpi))
      var ctx = document.getElementById("myChart").getContext('2d');
      var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: keys,
          datasets: [{
              label: 'Bitcoin Value',
              data: values,
          }]
      },
      options: {}
  });
}



