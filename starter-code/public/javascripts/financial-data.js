//Globals vars
var ctx = document.getElementById("myChart").getContext('2d');

let apiUrl = "https://api.coindesk.com/v1/bpi/historical/close.json";
let dateFrom = document.getElementById('dateFrom');
let dateTo = document.getElementById('dateTo');
let prueba = document.getElementById('prueba');

//function getData() {
        axios.get(apiUrl + "?start=" + dateFrom.value + "&end=" + dateTo.value)
        //axios.get(apiUrl)
        .then((response) => {
            
            //console.log(JSON.stringify(response.data.bpi));
            console.log(Object.values(response.data.bpi).map((x) => {return x/1000}));
            data.datasets[0].data = Object.values(response.data.bpi).map((x) => {return x/1000});
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



        })
        .catch(function (error) {
            console.log(error);
        });
//}

//var button = document.getElementById("buttonStart");
//button.addEventListener("click", getData);



var data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [{
      label: 'Historical BPI data',
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


