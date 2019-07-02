axios
  .get("https://api.coindesk.com/v1/bpi/historical/close.json")
  .then(JSONPayload => {
    console.log("Response from API is: ", JSONPayload.data.bpi);

    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Object.keys(JSONPayload.data.bpi),
        datasets: [{
          label: '# financial data',
          data: Object.values(JSONPayload.data.bpi),
          backgroundColor: '#fabada',
          borderColor: 'teal'

          //movidas de colores y data
        
        }]
      }
      
      
      
      
      //JSONPayload.data.bpi,
      // options: {xAxes: yAxes}
    });
    myChart.update()
  });



// var chart = new Chart(ctx, {
//   // The type of chart we want to create
//   type: 'line',
//   // The data for our dataset
//   data: {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [{
//       label: 'My First dataset',
//       backgroundColor: 'rgb(255, 99, 132)',
//       borderColor: 'rgb(255, 99, 132)',
//       data: [0, 10, 205, 2, 20, 30, 45]
//     }]
//   },
//   // Configuration options go here
//   options: {}
// });

// chart.data.datasets[0].data[i] = chart.data.datasets[0].data[i] * Math.random()

// chart.update();
