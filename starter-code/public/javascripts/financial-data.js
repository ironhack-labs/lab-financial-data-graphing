//Globals vars
var ctx = document.getElementById("myChart").getContext('2d');
let dateProof;

//HTTP request
axios({
  //"The HTTP method (verb) we are going to use"
  method: 'get',
  //"The url the server is going to receive."
  url: '/',
  //"URL parameters to be sent with the request" 
  params: {ID: 12345}
})
.then(response => {
  //Here we can do whatever we want with the response object
  console.log('On fire');
})
.catch(err => {
  //Here we catch the error and display it
  console.log(err);
})

axios.get('/')
  .then((response) => {

    dateProof = response.headers.date;
    data.datasets[0].label = response.headers.date;
    console.log("asignamos valor" + data.datasets[0].label);
    
    var myChart = new Chart(ctx, {
      type: 'bar',
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


});


var data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [{
      label: '# of Votes proof',
      data: [12, 19, 3, 5, 2, 3],
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
}

//console.log("valor variable" + dateProof);
//data.datasets[0].label = "Tue, 06 Feb 2018 18:10:49 GMT";
//console.log(data.datasets[0].label);



//var rightNow = new Date();
//console.log(myChart.data.datasets[0].label);


