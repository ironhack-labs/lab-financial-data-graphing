callChartjs('USD');

function callChartjs(currency, fromD, toD) {
  if (fromD && toD) {
    alert('http://api.coindesk.com/v1/bpi/historical/close.json?start=' + fromD + '&end=' + toD+'?currency=' + currency);
    axios
      .get('http://api.coindesk.com/v1/bpi/historical/close.json?start=' + fromD + '&end=' + toD+'?currency=' + currency)
      .then(function (response) {
        alert(response);  
        paintChart(response, currency);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    axios
      .get('http://api.coindesk.com/v1/bpi/historical/close.json?currency=' + currency)
      .then(function (response) {
        paintChart(response, currency);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

function paintChart(response, currency) {
  let keyData = [];
  let keyValues = [];
  keyData = Object.keys(response.data.bpi);
  keyValues = Object.values(response.data.bpi);
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: keyData,
      datasets: [{
        label: 'Rate ' + currency + ' / per day',
        data: keyValues,
        backgroundColor: [
          'rgba(88, 88, 88, 0.2)'
        ],
        borderColor: [
          'rgba(88, 88, 88, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      // responsive: true,
      title: {
        display: true,
        text: 'BitCoin rate in the last month'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Days'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value in ' + currency
          }
        }]
      }
    }
  });
}

document.getElementById('btnNewChart').addEventListener('click', function () {
  let from = document.getElementById('fromDate').value;
  let to = document.getElementById('toDate').value;
  let curr = document.getElementById('currency');
  let currency = curr.options[curr.selectedIndex].value;
  // alert(from.length)
  if((from.length==0)&&(to.length==0)){
    callChartjs(currency, from, to);
  }else{
    callChartjs(currency, from, to);
  }
});