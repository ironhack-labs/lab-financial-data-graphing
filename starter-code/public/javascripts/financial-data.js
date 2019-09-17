
window.onload = function() {
  updateChart('2019-08-17', '2019-09-17');
}


const printChart = (labels, values) => {
  const ctx = document.getElementById('myChart').getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        backgroundColor: 'blue',
        data: values,
      }],
    },
  });
};


document.querySelector('#start-date').onchange = function () {
  let startDate = document.getElementById('start-date').value;
  let endDate = document.getElementById('end-date').value;
  
  updateChart(startDate, endDate);
  
};

document.querySelector('#end-date').onchange = function () {
  let startDate = document.getElementById('start-date').value;
  let endDate = document.getElementById('end-date').value;
  
  updateChart(startDate, endDate);
  
};

function updateChart(startDate, endDate) {
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
  .then(res => {
    const labels = Object.keys(res.data.bpi);
    const values = Object.values(res.data.bpi);
    printChart(labels, values);
  })
}

