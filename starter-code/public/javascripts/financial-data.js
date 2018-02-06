const ctx = document.getElementById("myChart").getContext('2d');
let data;



axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
.then(response => {
  console.log(response.data.bpi)
  let dataData = Object.values(response.data.bpi)
  let labelsData = Object.keys(response.data.bpi)
  let myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
          label: 'Bitcoins Value',
          data: dataData
      }],
      labels: labelsData
    },
  });
}).catch(e => console.log(e))