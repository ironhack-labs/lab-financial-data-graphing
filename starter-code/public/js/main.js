var ctx = document.getElementById('myChart');

$.ajax({
  url: "http://api.coindesk.com/v1/bpi/historical/close.json",
  method: "get",
  //data: "In case we need to send data**" ,
  success: function (response) {



    var obj = jQuery.parseJSON(response);



    // Therefore, convert it to a real array
    var realArray = $.makeArray( obj )

    // Now it can be used reliably with $.map()
    $.map( realArray, function( val, i ) {
      // Do something
    });


    //var test = Object.keys(obj.bpi).map(key => obj.bpi[key])

    console.log(test);


    //console.log(obj.bpi);

    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Edson & Rafa Bitcoins",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
          }
        ]
      }
    });



  },
  error: function (err) {
    console.log(err);
  },
});
