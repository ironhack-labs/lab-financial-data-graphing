// const initDate = "2019-01-01"
// const endDate = "2019-05-01"
// const currency="USD"

document.getElementById("theButton").onclick = () => {
    const initDate = document.getElementById('fromDate').value
    const endDate = document.getElementById('toDate').value
    console.log(endDate)
    const currency = document.getElementById('currency').value


    if (initDate && endDate) {
        fnk(initDate, endDate, currency)
    }
}



function fnk(initDate, endDate, currency) {
    console.log("dbchksdbcjhsdcjhbdhc")
    const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${initDate}&end=${endDate}&currency=${currency}`
    axios
        .get(apiUrl)
        .then(response => console.log(printTheChart(response.data.bpi)))
        .catch(err => console.log(`error: ${err}`))

}

function printTheChart(stockData) {

    const stockDates = Object.keys(stockData);

    const stockPrices = Object.values(stockData)
    let minVaule = Math.min(...stockPrices)
    let maxValue = Math.max(...stockPrices)


    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: stockDates,
            datasets: [{
                label: "Stock Chart",
                backgroundColor: "rgba(255, 99, 132,.6)",
                borderColor: "rgb(255, 99, 132)",
                data: stockPrices
            }]
        }
    })
}