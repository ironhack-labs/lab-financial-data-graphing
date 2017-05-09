/*jshint esversion:6*/


// A $( document ).ready() block.
$( document ).ready(function() {


$.ajax({
  url: "http://api.coindesk.com/v1/bpi/historical/close.json",
  method: "GET",

  success: function (response) {
    console.log(response);
    const parsedJSON = JSON.parse(response);
    const dataObject = parsedJSON.bpi;
    const labels = Object.keys(dataObject);
    const values = Object.values(dataObject);
    console.log(labels);
    console.log(values);

    createChart(labels, values);

    //The callback function that will be executed if the request is completed succesfully
    //This function will have a parameter with the server response.
  },
  error: function (err) {
    console.log("ERRORERRORERROR");
    //The callback function that will be executed if the request fails, whether it was a client or a server error
    //It will have a parameter with error that caused the request to fail
  },
});

function createChart(labels,values){
  var ctx = $("#canvas");
  var data = {
      labels: labels,
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
              data: values,
              spanGaps: false,
          }
      ]
  };

  var myLineChart = new Chart(ctx, {
      type: 'line',
      data: data,
      //options: options
  });
}
});
