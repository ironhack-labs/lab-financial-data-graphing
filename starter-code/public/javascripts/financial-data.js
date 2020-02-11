const axiosApp = axios.create({ baseURL: `http://api.coindesk.com/v1/bpi/historical/close.json?` })


updateChart()

function updateChart() {


    let dateStart = document.getElementById('dateStart').value
    let dateFinish = document.getElementById('dateFinish').value
    let currency = document.getElementById('currency').value
    console.log(dateStart, dateFinish, currency)


    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateStart}&end=${dateFinish}&currency=${currency}`)
        .then(responseFromAPI => {
            console.log(responseFromAPI.data)
            printTheChart(responseFromAPI.data)
        })
        .catch(err => console.log("Error while getting the data: ", err))


}


function printTheChart(stockData) {
    const dailyData = stockData["bpi"]

    const stockDates = Object.keys(dailyData)

    const stockPrices = stockDates.map(date => dailyData[date])
    console.log(stockData, "stockchart")


    document.getElementById('max').innerHTML = Math.max(...stockPrices)
    document.getElementById('min').innerHTML = Math.min(...stockPrices)

    const ctx = document.getElementById("chart").getContext("2d")
    new Chart(ctx, {
        type: "line",
        data: {
            labels: stockDates,
            datasets: [
                {
                    label: "Stock Chart",
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: stockPrices
                }
            ]
        }
    })
}