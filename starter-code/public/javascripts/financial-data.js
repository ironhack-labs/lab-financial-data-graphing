let coin = axios.get('http://api.coindesk.com/v1/bpi/historical/close.json');

let coinString;
let bpiDates = [];
let bpiData = [];
coin.then(info => {
  coinString = info.data.bpi;
  for (key in coinString) {
    bpiDates.push(key);
    bpiData.push(coinString[key]);
  }

  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: bpiDates,
      datasets: [
        {
          label: 'BPI',
          data: bpiData,
          borderWidth: 1
        }
      ]
    }
  });
});
/*
var ctx = document.getElementById('myChart');
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: [
    {
      x: 10,
      y: 20
    },
    {
      x: 15,
      y: 10
    },
    {
      x: 25,
      y: 10
    },
    {
      x: 35,
      y: 10
    }
  ],
  options: {
    showLines: true
  }
});*/
