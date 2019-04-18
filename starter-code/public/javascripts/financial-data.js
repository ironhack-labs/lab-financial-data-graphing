const printChart = (dates, values) => {
    const ctx = document.getElementById('myChart').getContext('2d')
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    backgroundColor: 'rgba(100, 99, 132, 0.2)',
                    label: 'Bitcoin Chart',
                    data: values
                }
            ]
        }
    })
    console.log()
}

const bitcoinData = (startingDate, endingDate) => {
    axios
        .get(
            `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startingDate}&end=${endingDate}`
        )
        .then(response => {
            const { bpi } = response.data
            const dates = Object.keys(bpi)
            const values = Object.values(bpi)
            printChart(dates, values)
        })
        .catch(err => {
            console.error(err)
        })
}
bitcoinData()

// let startingDate = '2017-05-05'
// let endingDate = '2017-06-05'

// document.getElementById('starting-date-input').addEventListener('change', e => {
//     startingDate = e.target.value
//     bitcoinData(startingDate, endingDate)
// })

// document.getElementById('ending-date-input').addEventListener('change', e => {
//     endingDate = e.target.value
//     bitcoinData(startingDate, endingDate)
// })
// bitcoinData(startingDate, endingDate)

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', () => {
        let startingDate = document.getElementById('starting-date-input').value
        let endingDate = document.getElementById('ending-date-input').value
        bitcoinData(startingDate, endingDate)
    })
})
