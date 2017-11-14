window.onload = function() {
  var ctx = document.getElementById("chart").getContext('2d');

  axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
    .then(function(response) {
        console.log(response);
        data = response.data.bpi;
        myLineChart(ctx, data);

      }).catch(function(error) {
          console.log(error);
        });
  };

function myLineChart(ctx, data){ new Chart(ctx, {
  type: 'line',
  data: {
    labels: Object.keys(data),
    datasets: [{
      data: Object.values(data),
      label: "Bitcoin Price Index",
      borderColor: "#3e95cd",
      fill: true,
      backgroudColor: "#E9E9E9"
    }]
  },
  options: {
    title: {
      display: false,
      text: 'World population per region (in millions)'
    }
  }
});
}
