 const renderChart = (data) => {
  const dataStock = data.bpi
  const dataLabels = Object.keys(dataStock)
  const dataSets = Object.values(dataStock)

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: dataLabels,
          datasets: [{
              label: 'BPI',
              data: dataSets,
              backgrounådColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
          }]
      }
  });
}

// Get only necesary data
axios.interceptors.response.use(config => {return config.data})

// Get data from api
axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then(data => renderChart(data))
  .catch(error => console.error(error))
