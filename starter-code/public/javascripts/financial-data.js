let route;
window.onload = function() {
  var ctx = document.getElementById("chart").getContext('2d');

  route = 'http://api.coindesk.com/v1/bpi/historical/close.json?currency=USD';
  drawMyChart();
  function myLineChart(ctx, data) {
    new Chart(ctx, {
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

  function drawMyChart() {
    axios.get(route)
      .then(function(response) {
        console.log(response);
        data = response.data.bpi;
        myLineChart(ctx, data);
        document.getElementById('max').value = Math.max.apply(null,Object.values(data));
        document.getElementById('min').value = Math.min.apply(null,Object.values(data));

        if (document.getElementById('from').value == ""){
          document.getElementById('from').value = Object.keys(data)[0];
          document.getElementById('to').value = Object.keys(data)[Object.keys(data).length-1];
        }
      }).catch(function(error) {
        console.log(error);
      });
  };
  document.getElementById('from').onchange = function() {
    let end = document.getElementById('to').value;
    let currency = document.getElementById('currency').value;
    route = 'http://api.coindesk.com/v1/bpi/historical/close.json?currency='+currency+'&start='
    + this.value+"&end="+end;
    drawMyChart();
  };

  document.getElementById('to').onchange = function() {
    let start = document.getElementById('from').value;
    let currency = document.getElementById('currency').value;
    route = 'http://api.coindesk.com/v1/bpi/historical/close.json?currency='+currency+'&start='
    +start+"&end="+this.value;
    drawMyChart();
  };

  document.getElementById('currency').onchange = function(){
    let end = document.getElementById('to').value;
    let start = document.getElementById('from').value;
    route = 'http://api.coindesk.com/v1/bpi/historical/close.json?currency='+this.value+'&start='
    +start+"&end="+end;
    drawMyChart();
  };
};
