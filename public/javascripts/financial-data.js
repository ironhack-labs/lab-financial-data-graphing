

let startDate = document.getElementById('startDate')
let endDate = document.getElementById('endDate')


let dateStart = startDate.addEventListener('input', (el) => {
        return el.target.value
})

let dateEnd = endDate.addEventListener('input', (el) => {
    return el.target.value
})

// ?start=${dateStart}&end=${dateEnd}

axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    .then(response => {
        console.log(response.data.bpi);
        lineChart(response.data.bpi)
    })
    .catch(err=> {
        console.log(err)
    })


const lineChart = data => {
    const prices = Object.values(data)
    console.log(prices)
    const dates = Object.keys(data)
    console.log(dates)
let ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dates,
        datasets: [{
            label: 'Bitcoin Price Index',
            data: prices,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    //beginAtZero: true
                }
            }]
        }
    }
});
}






