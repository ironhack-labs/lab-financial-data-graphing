

let initChart = (start = "2019-01-01", end = "2019-04-20", curr) => {
  let url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&index=${curr}`;
  axios.get(url)
    .then(data=>{
      console.log(data);
      let finData = data.data
      buildCoinGraph(finData);
    })
    .catch(err=> console.log(err));
}

let buildCoinGraph = (data) =>{
  let keysX = [];
  for (var key in data.bpi) {
    keysX.push(key);
  }
  let valuesY = [];
  for (var key in data.bpi) {
    valuesY.push(data.bpi[key]);
  }

  let ctx = document.getElementById('coinGraph').getContext('2d');
  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: keysX,
      datasets: [{
        label: 'Coin Chart',
        borderColor: 'black',
        backgroundColor: 'rgb(50, 195, 255)',
        data: valuesY
      }]
    }
  });
}

initChart('2018-01-01', '2019-01-01', 'USD');

var button = document.getElementById('check');
button.addEventListener('click', ()=>{
  let start = document.getElementById('start').value;
  let end = document.getElementById('end').value;
  let curr = document.getElementById('currency').value;
  initChart(start, end, curr);
})