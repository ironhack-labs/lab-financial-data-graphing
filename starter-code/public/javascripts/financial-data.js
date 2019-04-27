const url = "http://api.coindesk.com/v1/bpi/historical/close.json";
const ctx = document.getElementById('myChart').getContext('2d');
const from = document.getElementById('from');
const to = document.getElementById('to');


function updateChart() {
 let url2;
  if (from.value === '' || to.value === '' ){
    url2= url;
  }else{
    url2=`${url}?start=${from.value}&end=${to.value}`;
  }
  axios.get(url2)
    .then(response => {
      console.log(response.data.bpi);
      createChart(response.data.bpi);
    })
    .catch(err => {
      console.log(err);
    })
};

function createChart(data) {
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: Object.keys(data),
      datasets: [{
        label: 'Bitcoin Value',
        data: Object.values(data),
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      }
    }
  })
}

from.onchange = () => updateChart();
to.onchange = () => updateChart();