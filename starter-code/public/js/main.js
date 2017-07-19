


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
        // console.log(xData);
        // console.log(yData);

          var ctx = document.getElementById("myChart").getContext('2d');
          var myLineChart = new Chart(ctx, {
              type: 'line',
              data: {
                  labels: xData,
                  datasets: [{
                      label: '# of Votes',
                      data: yData,
                      backgroundColor: [
                          'rgba(75, 192, 192, 0.2)'
                      ],
                      borderColor: [
                          'rgba(54, 162, 235, 1)'
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

},  error: function (err) {
  console.log(err);
}
});

        $('.dates').on('submit', function(e){
          e.preventDefault();
           var initalDate = $('#ini').val();
           var endDate = $('#end').val();

           $.ajax({
             url: "http://api.coindesk.com/v1/bpi/historical/close.json?start=" + initalDate + "&end=" + endDate,
             method: "GET",
             data: "",
             success: function (response) {
                 // console.log(response);
                 var mainObject = JSON.parse(response);
                 var xData = Object.keys(mainObject.bpi);
                 var yData = $.map(mainObject.bpi, function(val, key) { return val; });
                 // var yData = ;
                //  console.log(xData);
                //  console.log(yData);

                   var ctx = document.getElementById("myChart").getContext('2d');
                   var myLineChart = new Chart(ctx, {
                       type: 'line',
                       data: {
                           labels: xData,
                           datasets: [{
                               label: '# of Votes',
                               data: yData,
                               backgroundColor: [
                                   'rgba(255, 99, 132, 0.2)'
                               ],
                               borderColor: [
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
console.log(err);
        },
      });
  });

  $('.currency').on('submit', function(e){
    e.preventDefault();
     var cur = $(".currency option[type='text']:checked").val();

     $.ajax({
       url: "http://api.coindesk.com/v1/bpi/historical/close.json?currency=" + cur,
       method: "GET",
       data: "",

       success: function (response) {

        
           var mainObject = JSON.parse(response);
           var xData = Object.keys(mainObject.bpi);
           var yData = $.map(mainObject.bpi, function(val, key) { return val; });
           // var yData = ;
          //  console.log(xData);
          //  console.log(yData);

             var ctx = document.getElementById("myChart").getContext('2d');
             var myLineChart = new Chart(ctx, {
                 type: 'line',
                 data: {
                     labels: xData,
                     datasets: [{
                         label: 'Currency' + cur,
                         data: yData,
                         backgroundColor: [
                             'rgba(255, 10, 87, 0.2)'
                         ],
                         borderColor: [
                             'rgba(55, 59, 6, 1)'
                         ],
                         borderWidth: 5
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
                console.log(cur);
  $('#myChart').append(myLineChart);

},

    error: function (err) {
console.log(err);

  },
});
});







  });
