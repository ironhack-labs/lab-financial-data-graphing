/* jshint esversion:6 */

$(document).ready( () => {


  /* Return a promise to request a pokemon with an ID */
  const baseURL = "http://api.coindesk.com/v1/bpi/historical/close.json";
  function requestPromise(){
    return $.ajax({
      url: `${baseURL}`,
      dataType:'json',
    }).then(data => {
      console.log(data.bpi);
    printData(data.bpi);
    }).catch( e  => console.log(e));
  }
requestPromise();

function printData (data) {
  var prices = [];
  prices = Object.values(data);
var ctx = document.getElementById('canvas').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
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
var canvas = document.getElementById('canvas');
canvas.append(myChart);
}

});
