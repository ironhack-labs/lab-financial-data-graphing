const restFinancialData = axios.create({
    baseURL: "http://api.coindesk.com/"
})

const query = "v1/bpi/historical/close.json"

window.onload = restFinancialData

    .get(query)
    .then(responseFromAPI => printTheChart(responseFromAPI.data))
    .catch(err => console.log("Error while getting the data: ", err))

function printTheChart(stockData) {

    const dailyData = stockData.bpi

    const stockDates = Object.keys(dailyData)
    const stockPrices = stockDates.map(date => dailyData[date])

    const ctx = document.getElementById("myChart").getContext("2d");

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
