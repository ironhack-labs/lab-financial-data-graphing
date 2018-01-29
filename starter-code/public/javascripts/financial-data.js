

var ctx = document.getElementById("myChart").getContext("2d");
var currency = "USD";



function drawChart(dates, values) {

  new Chart(ctx, {
    options: {
      responsive: false
    },
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
          label: "Bitcoin Price Index",
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75, 192, 192, 0.4)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75, 192, 192, 1)',
          pointBackgroundXolor: '#fff',
          pointborderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
          pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          data: values
        }],
    }
  });
}


function getCurrency(){
  currency = this.value.split(" ")[0];
  getDataAndDrawChart();
}





$("#currency").change(getCurrency);




// Get historical data by currency

function getDataAndDrawChart() {
  axios.get('http://api.coindesk.com/v1/bpi/historical/close.json?currency=' + currency +'').then(function(data) {
    let dates = Object.keys(data.data.bpi);
    let values = Object.values(data.data.bpi);

    drawChart(dates, values);
    let minVal = Math.min(...values);
    let maxVal = Math.max(...values);
    $('#max').text(maxVal + ' ' + currency);
    $('#min').text(minVal + ' ' + currency);
  });

  axios.get('https://api.coindesk.com/v1/bpi/currentprice.json').then(function(data){
    currentRate= data.data.bpi[currency].rate_float.toFixed(2); // quería que sólo me mostrara 2 decimales pero .toFixed(2) hace que no se me muestre.
    lastUpdate= data.data.time.updated;
    $('#current-rate').text(currentRate + ' ' + currency);
    $('#last-checked').text(lastUpdate + ' ' + currency);
  });
}

getDataAndDrawChart();



$('input[name="dates"]').daterangepicker({
    locale: {
      format: 'YYYY-MM-DD'
    },
    startDate: '2018-01-01', // Me gustaría que de inicio se mostrara la evolución del último mes
    endDate: '2018-01-24'
  },
  function(start, end, label) {
    let selectedStart = start.format('YYYY-MM-DD');
    let selectedEnd = end.format('YYYY-MM-DD');
    axios.get("https://api.coindesk.com/v1/bpi/historical/close.json?start=" + selectedStart + "&end=" + selectedEnd +"").then(function(data){

      let dates = Object.keys(data.data.bpi);
      let values = Object.values(data.data.bpi);

      drawChart(dates, values);

  });
});
