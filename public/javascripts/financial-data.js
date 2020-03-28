window.addEventListener('DOMContentLoaded', (event) => {
let firsDateElement = document.getElementById('firstDate')
let lastDateElement = document.getElementById('lastDate')
const URL = 'http://api.coindesk.com/v1/bpi/historical/close.json'

    // Request to get the default dates for the bitcoin prices graph
axios({
        method: 'GET',
        url: URL,
        })
.then(response => {
            const dates = Object.keys(response.data.bpi)
            const prices = Object.values(response.data.bpi)
            const firstDate = dates[0]
            const lastDateLength = dates.length
            const lastDate = dates[lastDateLength - 1]
            firsDateElement.value = firstDate
            lastDateElement.value = lastDate
            renderChart(dates, prices)
        })
.catch(err => console.log(err));
    console.log('DOM fully loaded and parsed');
});

// Event listener for changing dates
document.addEventListener('click', (event) => {
let firsDateElement = document.getElementById('firstDate')
let lastDateElement = document.getElementById('lastDate')
const firstDate = firsDateElement.value
const lastDate = lastDateElement.value
// Request to gives us the date selection
const selectedDateURL = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${firstDate}&end=${lastDate}`
axios({
        method: 'GET',
        url: selectedDateURL,
        })
.then(response => {
const dates = Object.keys(response.data.bpi)
const prices = Object.values(response.data.bpi)
renderChart(dates, prices)
        })
.catch(err => console.log(err))
})

// Render the Bitcoin graph
function renderChart(dates, prices) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Bitcoin Price',
                data: prices,
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
    });
}