

const start = document.getElementById(`start`)
const end = document.getElementById(`end`)

const currency = document.getElementById(`currency`)

const max = document.getElementById(`max`)
const min = document.getElementById(`min`)

const ctx = document.getElementById('myChart').getContext('2d');

start.addEventListener('input', function (e) {
    updateChart()
})

end.addEventListener('input', function (e) {
    updateChart()
})

const printTheChart = data => {

    const months = Object.keys(data)
    const prices = Object.values(data)

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: `BitCoin Value(${currency.value})`,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: prices,
            }]
        }
    })

    max.innerText = Math.max(...prices)
    min.innerText = Math.min(...prices)
}


const updateChart = () => {
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency.value}&start=${start.value}&end=${end.value}`)
    .then(response => response.data.bpi)
    .catch(err => console.log(`Error getting API data :( -> ${err}`))

    .then((data)=>{
        printTheChart(data)
    })
}


updateChart()




