function initChart(start, end, curr){
  let url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&index=${curr}`;
  fetch(url)
    .then(res=>{
      if(!res.ok) return Promise.reject(res.statusText);
      return res.json();
    })
    .then(data=>{
      console.log(data);
      buildCoinGraph(data);
    })
    .catch(err=> console.log(e));
}

function buildCoinGraph(data){
  let coinLabels = [];
  for (var key in data.bpi) {
    coinLabels.push(key);
  }
  let coinPrices = [];
  for (var key in data.bpi) {
    coinPrices.push(data.bpi[key]);
  }

  let ctx = document.getElementById('coinGraph').getContext('2d');
  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: coinLabels,
      datasets: [{
        label: 'Coin Chart',
        borderColor: 'rgb(15,98,189)',
        data: coinPrices
      }]
    }
  });
}

initChart('2017-01-01', '2017-12-31', 'USD');

var button = document.getElementById('check');
button.addEventListener('click', ()=>{
  let start = document.getElementById('start').value;
  let end = document.getElementById('end').value;
  let curr = document.getElementById('currency').value;
  initChart(start, end, curr);
})


