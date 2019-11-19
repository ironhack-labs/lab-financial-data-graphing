

// const currency = 'EUR'
// const startDate = '2019-01-01'
// const endDate = '2019-05-01'
function ald() {
    const startDate = document.getElementById('startDate').value
    const endDate = document.getElementById('endDate').value
    const currency = document.getElementById('currency').value


    const apiURl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`

    axios
        .get(apiURl)
        .then(responseFromApi => printTheChart(responseFromApi.data))
        .catch(err => console.log('error al coger API', err))

    function printTheChart(stockData) {


        const dailyData = stockData["bpi"]

        const stockDates = Object.keys(dailyData)

        const stockPrice = Object.values(dailyData)


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
                        data: stockPrice
                    }
                ]
            }
        })
    }
}
// }
document.getElementById('button').onclick = () => {

    // console.log(startDate, endDate)
    ald()

}