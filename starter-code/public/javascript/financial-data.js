$(document).ready(function(){
  console.log("entro");
  $("#submit").on('click',function(e){
    e.preventDefault();
  const start=$("#start-date").val();
  const end=$("#end-date").val();
  const currency=$("select option").val();
  showChart(start,end,currency);
});
function showChart(start,end,currency){

  $.ajax({
    url: `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`,
    method: "GET",

    success: function (response) {
      data = JSON.parse(response);
      //The callback function that will be executed if the request is completed succesfully
      //This function will have a parameter with the server response.
      console.log(data.time.updated);
      const dates=(Object.keys(data.bpi));
      const price=(Object.values(data.bpi));
      createChart(dates,price);

    },
    error: function (err) {
      //The callback function that will be executed if the request fails, whether it was a client or a server error
      //It will have a parameter with error that caused the request to fail
      console.log(err);
    },
  });
}
  function createChart(dates,price){
  var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: dates,
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: price,
        }]
    },

    // Configuration options go here
    options: {}
});
}
});
