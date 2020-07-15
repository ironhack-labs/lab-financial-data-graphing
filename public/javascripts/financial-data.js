axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
    .then(responseFromApi => {
        const labels = Object.keys(responseFromApi.data.bpi)
        const ctx = document.getElementById('myChart').getContext('2d');
        const data = Object.values(responseFromApi.data.bpi)
        const chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: labels,
                datasets: [{
                    label: 'Bitcoin Price',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data
                }]
            },

            // Configuration options go here
            options: {}
        });

    })
    // })
    .catch(error => console.error(error))