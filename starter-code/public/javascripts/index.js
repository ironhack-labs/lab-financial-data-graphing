$(document).ready(function(){
  // var dd = today.getDate();
  // var mm = today.getMonth()+1; //January is 0!
  // var yyyy = today.getFullYear();

  $('.fromdate').pickadate({
    format: 'yyyy-mm-dd',
    max: new Date(),
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });

  var picker = $('.todate').pickadate({
    format: 'yyyy-mm-dd',
    min: $('.fromdate')[0].value,
    max: new Date(),
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });

  var oli = function() {
    try {
      picker.pickadate.clear();
    }
    catch(err) {
        console.log("error");
    }

      picker = $('.todate').pickadate({
      min: $('.fromdate')[0].value,
      max: new Date(),
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });
  };

  $('.fromdate').on('change', function(){
    oli();
  });





  $('input').on('change', function(){
    var start = $('.fromdate')[0].value;
    var end = $('.todate')[0].value;
    console.log(start);
    $.ajax({
      url: 'http://api.coindesk.com/v1/bpi/historical/close.json?start='+start+'&end='+end,
      method: 'get',
      success: function(res){
        // var myChart = new Chart({...});
        var docChart = res;
        var objChart = JSON.parse(docChart);
        var datesChart = Object.keys(objChart.bpi);
        var valuesChart = Object.values(objChart.bpi);
        console.log(datesChart);
        console.log(valuesChart);
        $('body').append('<canvas id="myCanvas"></canvas>');
        var ctx = $('#myCanvas');
        var myChart = new Chart(ctx,{
          type: 'line',
          data: {
            labels: datesChart,
            datasets: [
              {
                  label: "My First dataset",
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
                  data: valuesChart,
                  spanGaps: false,
              }
            ]
          }
        });
        $('body').append('<table class="chart">'+
          '<tr>'+
            '<th>DATE</th>'+
            '<th>VALUE</th>'+
          '</tr>'+
        '</table>');

        datesChart.forEach(function(date, index, array){
          $('.chart').append('<tr>'+
            '<td class="date">'+date+'</td>'+
            '<td class="value">'+valuesChart[index]+'</td>'+
          '</tr>');
        });
        // <ul>
        //   <li>
        //     <span class="date"></span>
        //     <span class="value"></span>
        //   </li>
        // </ul>
      },
      error: function(err) {
        console.log(err);
      },

    });
  });
  console.log("Oli mola");
});
