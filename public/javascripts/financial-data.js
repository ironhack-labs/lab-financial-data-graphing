const coinDeskApi = axios.create({
    baseURL: `http://api.coindesk.com/v1/bpi/historical/close.json`
})

const initDate = document.getElementById("initDate")
const endDate = document.getElementById("endDate")
const currency = document.getElementById("currency")

let query = `query?start=${initDate.value}&end=${endDate.value}`


coinDeskApi
    .get(query)
    .then(responseFromApi => printTheChart(responseFromApi.data))
    .catch(err => console.log("Error while getting the data: ", err))

function printTheChart(bitCoinData) {
    const dailyValue = bitCoinData.bpi

    const bitcoinDates = Object.keys(dailyValue)
    const bitcoinPrice = Object.values(dailyValue)

    const ctx = document.getElementById("myChart").getContext("2d")
    new Chart(ctx, {
        type: "line",
        data: {
            labels: bitcoinDates,
            datasets: [{
                label: "Bitcoin Price Index",
                backgroundColor: "rgba(2, 2, 2, .2)",
                borderColor: "rgba(3, 3, 3, .4)",
                data: bitcoinPrice
            }]
        }
    })
}

//EventListeners
initDate.addEventListener("change", (event) => {
    query = `query?start=${event.target.value}&end=${endDate.value}`
    coinDeskApi
        .get(query)
        .then(responseFromApi => printTheChart(responseFromApi.data))
        .catch(err => console.log("Error while getting the data: ", err))

})
endDate.addEventListener("change", (event) => {
    query = `query?start=${initDate.value}&end=${event.target.value}`
    coinDeskApi
        .get(query)
        .then(responseFromApi => printTheChart(responseFromApi.data))
        .catch(err => console.log("Error while getting the data: ", err))

})