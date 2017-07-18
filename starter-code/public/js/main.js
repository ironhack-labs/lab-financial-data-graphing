


$(document).ready(function() {

  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json",
    method: "GET",
    data: "",
    success: function (response) {
        // console.log(response);
        var mainObject = JSON.parse(response);
        var xData = Object.keys(mainObject.bpi);
        var yData = $.map(mainObject.bpi, function(val, key) { return val; });
        // var yData = ;
        console.log(xData);
        console.log(yData);

          var ctx = document.getElementById("myChart").getContext('2d');
          var myLineChart = new Chart(ctx, {
              type: 'line',
              data: {
                  labels: xData,
                  datasets: [{
                      label: '# of Votes',
                      data: yData,
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
              },
              options: {
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero:true
                          }
                      }]
                  }
              }
          });


        $('.dates').on('submit', function(e){
          e.preventDefault();
           var initalDate = $('#ini').val();
           var endDate = $('#end').val();

           $.ajax({
             url: "http://api.coindesk.com/v1/bpi/historical/close.json?start=<" + initalDate + ">&end=<" + endDate + ">",
             method: "GET",
             data: "",
             success: function (response) {
                 // console.log(response);
                 var mainObject = JSON.parse(response);
                 var xData = Object.keys(mainObject.bpi);
                 var yData = $.map(mainObject.bpi, function(val, key) { return val; });
                 // var yData = ;
                 console.log(xData);
                 console.log(yData);

                   var ctx = document.getElementById("myChart").getContext('2d');
                   var myLineChart = new Chart(ctx, {
                       type: 'line',
                       data: {
                           labels: xData,
                           datasets: [{
                               label: '# of Votes',
                               data: yData,
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
                       },
                       options: {
                           scales: {
                               yAxes: [{
                                   ticks: {
                                       beginAtZero:true
                                   }
                               }]
                           }
                       }

        });


        $('#myChart').append(myLineChart);

    },
    error: function (err) {
        console.log("error");
    },
  });
