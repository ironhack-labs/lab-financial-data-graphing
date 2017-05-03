/*jshint esversion: 6*/
$(document).ready(() => {
  $('.input-div').on('input', '.dateinput', function() {
      let maxDate = $('#endDate').val();
      let minDate = $('#startingDate').val();
      // console.log("minDate",minDate);
      // console.log("maxDate",maxDate);
      getDateInfo(minDate,maxDate);
  });

});

function getDateInfo(minDateString,maxDateString) {
  $.ajax({
    url: 'http://api.coindesk.com/v1/bpi/historical/close.json',
    method: "GET",
    success: (response) => {
      let time = JSON.parse(response);
      // console.log(time.bpi);
      // console.log("minDateString",minDateString);
      let minDate = new Date(minDateString);
      // console.log("minDate",minDate);
      // console.log("maxDateString",maxDateString);
      let maxDate = new Date(maxDateString);
      // console.log("maxDate",maxDate);
      let dataChart = inspectData(time.bpi,minDate,maxDate);

      var ctx = document.getElementById("myChart");
      var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: Object.keys(dataChart),
              datasets: [{
                  label: '# of Votes',
                  data: Object.values(dataChart),
                  backgroundColor:
                      'rgba(255, 99, 132, 0.2)',
                  borderColor:
                      'rgba(255,99,132,1)',
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


    },
    error: function (err) {
      console.log(err);
    },
  });
}

function inspectData(obj, minDate, maxDate) {
  var tempObj = {};
  for (var p in obj) {

    if( obj.hasOwnProperty(p) )
    {
      let dateInspected = new Date(p);
      console.log("dateInspected",dateInspected);
      if(minDate<=dateInspected && dateInspected<=maxDate)
      {
        // console.log("hi");
        tempObj[p] = obj[p];
      }
    }
  }
    console.log("minDate",minDate);
      console.log("maxDate",maxDate);
  return tempObj;
}
