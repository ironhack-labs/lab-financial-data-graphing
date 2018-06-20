const bitcoinInfo = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
})

document.getElementById('submit').onclick = function() {
  let start = '?start=' + document.getElementById('start-date').value;
  let end = '&end=' + document.getElementById('end-date').value;
  let curr = document.getElementById('currency').value;
  let currency = 'currency=' + curr;
  let query = start + end;

  bitcoinInfo.get(query = "")
  .then(response => {
    generateGraph( response.data );
    document.getElementById('min-value').innerText = Math.min.apply(null, Object.values(response.data.bpi) ) + ` ${curr}`;
    document.getElementById('max-value').innerText = Math.max.apply(null, Object.values(response.data.bpi) ) + ` ${curr}`;
  })
  .catch( error => { throw error });
}

function generateGraph( data ) {
  let stockLabels = Object.keys( data.bpi );
  let stockPrice = Object.values( data.bpi );
  let ctx = document.getElementById('bitcoin-graph').getContext('2d');
  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockLabels,
      datasets: [
        {
          label: "Bitocoin value",
          borderColor: 'rgb(255, 99, 132)',
          data: stockPrice,
        }
      ]
    }
  });
}