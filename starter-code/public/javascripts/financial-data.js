

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