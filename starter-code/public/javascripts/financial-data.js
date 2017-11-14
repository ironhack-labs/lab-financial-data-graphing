// $.ajax({
//   url: "http://api.coindesk.com/v1/bpi/historical/close.json",
//   method: "GET",
//   data:"asass",
//   success: function (response) {
//     console.log(response);
//     //The callback function that will be executed if the request is completed succesfully
//     //This function will have a parameter with the server response.
//   },
//   error: function (err) {
//     console.log(`este es el error: ${err}`);
//     //The callback function that will be executed if the request fails, whether it was a client or a server error
//     //It will have a parameter with error that caused the request to fail
//   },
// })
// Make a request for a user with a given ID
let response = "";

axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then(function (response) {
    //console.log(response);
      let obj = response.data.bpi;
      let dates = Object.keys(obj);
      let datesValues = Object.values(obj);
      var ctx = document.getElementById("myChart").getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: dates,
              datasets: [{
                  label: '# of Votes',
                  data: datesValues,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255,99,132,1)'
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

      console.log(dates);
      })
  .catch(function (error) {
    console.log(error);
  });




// // Optionally the request above could also be done as
// axios.get('/user', {
//     params: {
//       ID: 12345
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
