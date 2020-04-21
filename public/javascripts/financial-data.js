const apiBitcoin = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
})

apiBitcoin
    .get()
    .then(responseFromAPI => printChart(responseFromAPI))
    .catch(err => console.log('Error al requerir la API', err))


// const fromDate = document.getElementById('input-start')
// const toDate = document.getElementById('input-finish')

// const arrayDates = [fromDate, toDate]

//     apiBitcoin
//         .get(arrayDates)
//         .then(responseFromAPI => printChart(responseFromAPI))
//         .catch(err => console.log('no has conseguido nada', err))


function printChart(pepe) {

    const dailyData = pepe.data.bpi
    const stockDates = Object.keys(dailyData)
    const bitPrices = stockDates.map(date => dailyData[date])


    const ctx = document.getElementById('my-canvas').getContext('2d')

    new Chart(ctx, {
    type: 'line',
    data: {
        labels: stockDates,
        datasets: [{
            label: 'BitCoin price index',
            data: bitPrices,
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
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    })

}



