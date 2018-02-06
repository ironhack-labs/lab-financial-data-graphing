

const coinApi = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
})

function getCoinInfo() {
  coinApi.get()
    .then(response => {
      
      var obj = response.data.bpi;
      var result = (Object.entries(obj));
      var arrDates = [];
      var arrNum = [];
      console.log(result);
      console.log(result[0][0]);
      for (var i= 0; i < result.length; i++) {
        arrDates.push(result[i][0])
        arrNum.push(result[i][1])
      }
      console.log(arrDates);
      console.log(arrNum);

      var speedCanvas = document.getElementById("speedChart");

      var speedData = {
        labels: arrDates,
        datasets: [{
          label: "numbers",
          data: arrNum,
        }]
      };

      var chartOptions = {
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 80,
            fontColor: 'black'
          }
        }
      };
      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        data: speedData,
        options: chartOptions
      });
    })
    .catch(err => {
      console.error(err)
    });
}

window.onload = function() {
  document.getElementById("coin-button").addEventListener('click', getCoinInfo);
}

//  <canvas id="myChart" width="400" height="400"></canvas>

// var ctx = document.getElementById("myChart").getContext('2d');
// var myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         datasets: [{
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255,99,132,1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
// }); }