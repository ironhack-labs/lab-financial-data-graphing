const bitcoinApi = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi"
});
var axeX = [];
var axeY = [];

function getCoinInfo() {
  var startingDate = document.getElementById("startingDate").value;
  var endingDate = document.getElementById("endingDate").value;
  bitcoinApi
    .get(`/historical/close.json?start=${startingDate}&end=${endingDate}`)
    .then(response => {
      console.log(response.data.bpi);
      const historicalData = response.data.bpi;
      //   axeX = Object.keys(historicalData);
      //   axeY = Object.values(historicalData);
      //   console.log(axeX);
      var ctx = document.getElementById("myChart").getContext("2d");

      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: Object.keys(historicalData),
          datasets: [
            {
              label: "Scatter dataset",
              data: Object.values(historicalData)
            }
          ]
        }
      });
    })

    .catch(err => {
      console.log(err);
    });
}

document.getElementById("coinButton").onclick = function() {
  getCoinInfo();
};

// function getCordonates(aseX, aseY) {
//   var coordinates = [];
//   for (let i = 0; i <= aseX.length; i++) {
//     coordinates.push({
//       x: aseX[i],
//       y: aseY[i]
//     });
//   }
//   console.log(coordinates);
//   return coordinates;
// }
