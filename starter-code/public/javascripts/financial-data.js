
let data = undefined


const start = document.getElementById(`start`)
const end = document.getElementById(`end`)

start.addEventListener('input', function (e) {
    updateChart()
})

end.addEventListener('input', function (e) {
    updateChart()
})


updateChart = () => {
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start.value}&end=${end.value}`)
    .then(response => data=response.data.bpi)
    .catch(err => console.log(`¡Ops! Error :( -> ${err}`))

    .then(()=>{
        const printTheChart = data => {

            const months = Object.keys(data)
            const prices = Object.values(data)
        
            const ctx = document.getElementById('myChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: months,
                    datasets: [{
                        label: "Testing",
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: prices,
                    }]
                }
            })
            console.log(prices)
        }
        
        printTheChart(data)
    })
}


updateChart()




