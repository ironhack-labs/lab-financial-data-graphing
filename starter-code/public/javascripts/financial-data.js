const ctx = document.getElementById("myChart").getContext('2d');
let data;
let fromData;
let toData;

function drawChart(route){ axios
    .get(route)
    .then(response => {
      console.log(response.data.bpi);
      let dataData = Object.values(response.data.bpi);
      let labelsData = Object.keys(response.data.bpi);
      let myLineChart = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: "Bitcoins Value",
              data: dataData
            }
          ],
          labels: labelsData
        }
      });
    })
    .catch(e => console.log(e));
}

document.getElementById("from").addEventListener('input', function (evt) {
  fromData = document.getElementById("from").value;
  drawChart(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromData}&end=${toData}`)
});
document.getElementById("to").addEventListener('input', function (evt) {
  toData = document.getElementById("to").value;
  drawChart(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromData}&end=${toData}`)
});

drawChart('http://api.coindesk.com/v1/bpi/historical/close.json')