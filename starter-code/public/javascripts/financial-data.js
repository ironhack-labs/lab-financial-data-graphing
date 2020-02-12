axios({
  method: 'GET',
  url: 'http://api.coindesk.com/v1/bpi/historical/close.json'
})
  .then(response => {
    // Here we can do something with the response object
  })
  .catch(err => {
    // Here we catch the error and display it
  });

document.querySelector('#button').onclick = function() {
  const response = axios.get(
    `http://api.coindesk.com/v1/bpi/historical/close.json`
  );
  response.then(res => {
    console.log(res);
    const bpi = res.data.bpi;
    const years = Object.keys(bpi);
    const price = Object.values(bpi);
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Bitcoin price index',
            data: price,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  });
};

const ctx = document.getElementById('chart').getContext('2d');
