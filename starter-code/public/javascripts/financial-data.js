axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then(bitcoinData => {
    draw(bitcoinData.data.bpi);
  })
  .catch(err => console.log(err));

/*
  data: {
    bpi: {
        2019-03-16: 4022.5383
        2019-03-17: 3999.6617
        2019-03-18: 4004.8117
    }
  }
*/

function draw(data) {
  var chartCanvas = document.querySelector("#chart");
  var ctx = chartCanvas.getContext("2d");
  var labels = Object.keys(data);
  var prices = Object.values(data);

  var chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
              label: "Mi grafico",
              backgroundColor: 'rgb(0, 0, 0)',
              borderColor: 'rgb(0, 0, 0)',
              data: prices
          }]
    }
  });
}
