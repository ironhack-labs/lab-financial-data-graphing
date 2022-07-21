const ctx = document.getElementById('myChart').getContext('2d');

axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then(function (response) {
    // handle success
    console.log(response.data.bpi);

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(response.data.bpi),
            datasets: [{
                label: 'Bitcoin price',
                data: Object.values(response.data.bpi),
               
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });







  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })







  

