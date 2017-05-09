$(document).ready(function(){
getDate();

$('#filter-date').on('click', function (event) {
    event.preventDefault();

      start= $("#start").val();
      start= reorderDates(start);
      end= $("#end").val();
      end= reorderDates(end);



  });



});


function reorderDates (date){
  var newDate = date.split('/');
  var tmp = newDate[0];
  newDate[0] = newDate[2];
  newDate[2] = newDate[1];
  newDate[1] = tmp;
  // newDate = newDate.reverse();
  newDate = newDate.join('-'); // return date.split('/').reverse().join('-') would be the shorthand for this
  return newDate;
}

function getDate(){

  var url = "";
  if(typeof(d)=== "undefined") url = "http://api.coindesk.com/v1/bpi/historical/close.json";
  else url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`;
  console.log(url);



  $.ajax({
  url: "http://api.coindesk.com/v1/bpi/historical/close.json",
  method: "GET",
  data: "" ,
  success: function (response) {
  var obj = JSON.parse(response).bpi;
  console.log(obj);
  var data = {
    labels: [],
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
            data: [],
            spanGaps: false,
        }
    ]
};
for(var keys in obj){
                        data.labels.push(keys);
                        data.datasets[0].data.push(obj[keys]);
                    }
        var ctx = $('#myChart');
              var myChart = new Chart(ctx,{
                          type: 'line',
                          data: data,
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
