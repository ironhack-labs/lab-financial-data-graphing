const coinDeskAPI = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
    
})

coinDeskAPI.get('')

    .then(response => printCharts(response.data.bpi))
    .catch(err => console.log('error', err))



    const printCharts = data => {
        showChart('q2', data)

        const ctx = document.getElementById('myChart').getContext('2d');
    }




    const showChart = (id, data, bpi) => {
        Object.keys(bpi)   ? document.getElementById (id).Object.keys(bpi) = Object.keys(bpi) : null
        new Chart(id, {
            type: 'line',
            data: {
                labels: Object.keys(bpi),
                datasets: [{
                    label: '',
                    data: Object.values(bpi),
                    borderColor: 'rgba(0, 50, 250, .7)',
                    borderWidth: 1,
                    backgroundColor: 'rgba(0, 250, 50, .2)'
                }
            ]

            
       }

        })
    }
