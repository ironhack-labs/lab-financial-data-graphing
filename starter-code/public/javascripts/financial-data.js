function updateValue() {
    let fromValue = document.getElementById('from').value
    let toValue = document.getElementById('to').value

    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromValue}&end=${toValue}`)
        .then(responseFromApi => {
            printTheChart(responseFromApi.data)
        })
        .catch(err => console.log(`Error accediendo a los datos ${err}`))
}

function printTheChart(stockData) {
    let dailyData = stockData.bpi
    let stockDates = Object.keys(dailyData)
    let stockPrices = Object.values(dailyData)
    const ctx = document.getElementById("myChart").getContext("2d")


    new Chart(ctx, {
        type: "line",
        data: {
            labels: stockDates,
            datasets: [{
                label: "Stock Chart",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: stockPrices
            }]
        }
    })


}

document.getElementById('from').onchange = () => updateValue()
document.getElementById('to').onchange = () => updateValue()