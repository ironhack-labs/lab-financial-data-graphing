axios.get(' https://api.coindesk.com/v1/bpi/historical/close.json')
  .then(response => {
    console.log(response.data);
    chart(response.data);
  })
  .catch(err => {
    next(err)
  })

function chart(bpiData) {
  const coinLabels = Object.keys(bpiData.bpi);
  const coinPrice = Object.values(bpiData.bpi);
  const ctx = document.getElementById("myChart").getContext('2d');
  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: coinLabels,
      datasets: [{
        label: 'Bpi Chart',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: coinPrice
      }]
    }
  });
}

document.getElementById('form-submit').onclick = function () {
  let start = document.getElementById('start').value;
  let end = document.getElementById('end').value;
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
    .then(response => {
      console.log(response.data)
      chart(response.data)
    })
    .catch(err => {
      next(err)
    })
};