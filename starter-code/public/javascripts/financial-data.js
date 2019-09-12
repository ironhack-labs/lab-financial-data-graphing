const drawCharts = (labels, values) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            backgroundColor: 'rgb(255,99, 132)',
            label: 'Bitcoin Price Index',
            data: values
          }
        ]
      }
    })
  }

const today = new Date();
const month = today.getMonth() - 1;
const day = today.getDay();
document.getElementById('from').valueAsDate = new Date(2019, month, day, 10, 33, 30);
document.getElementById('to').valueAsDate = today;

updateChart();

document.getElementById('from').onchange = function() {
    updateChart();
}

document.getElementById('to').onchange = function() {
    updateChart();
}

document.getElementById('currency').onchange = function() {
    updateChart();
}

function updateChart() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const currency = document.getElementById('currency').value;
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}&currency=${currency}`)
    .then(response => {
        drawCharts(Object.keys(response.data.bpi), Object.values(response.data.bpi));
        document.getElementById('max').innerText = Math.max.apply(Math, Object.values(response.data.bpi));
        document.getElementById('min').innerText = Math.min.apply(Math, Object.values(response.data.bpi));
    });
}