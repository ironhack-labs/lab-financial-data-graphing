/*jshint esversion:6*/
function getData(){
  $.ajax({
    url:"http://api.coindesk.com/v1/bpi/historical/close.json",
    method:"GET",
    success: function (response) {
      let json = jQuery.parseJSON(response);
      console.log(json);
      var ctx = document.getElementById("myChart");
      let keys = Object.keys(json.bpi);
      let values = Object.values(json.bpi);
      let data= {
        labels: keys,
        datasets: [{
          label: 'line',
          data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
          borderWidth: 1
        }]
      };
      console.log(data);
      let myLineChart = new Chart(ctx, {
        type: 'line',
        data: data
      });
    }
  });
}
getData();
