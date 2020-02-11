const axiosApp = axios.create({
    baseURL: `http://api.coindesk.com/v1/bpi/historical/`
})

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;

const dataFrom = document.querySelector('#dataFrom')
const dataTo = document.querySelector('#dataTo')
const currencyDOM = document.querySelector('#currency')
const maxValue = document.querySelector('#maxValue')
const minValue = document.querySelector('#minValue')
let FromDate
let ToDate
let currency
dataTo.value = today
dataFrom.value = '2020-01-01'
console.log(currencyDOM.value)
currency = currencyDOM.value

function checkDates() {
    FromDate = dataFrom.value
    ToDate = dataTo.value
    currency = currencyDOM.value
    console.log(`FROM: ${FromDate} TO: ${ToDate} CURRENCY: ${currency}`)

    axiosApp.get(`close.json?currency=${currency}&start=${FromDate}&end=${ToDate}`)
        .then(responseFromAPI => printTheChart(responseFromAPI.data))
        .catch(err => console.log("Error while getting the data: ", err))

}
dataFrom.onchange = () => checkDates()
dataTo.onchange = () => checkDates()
currencyDOM.onchange = () => checkDates()




axiosApp.get(`
            close.json `)
    .then(responseFromAPI => printTheChart(responseFromAPI.data))
    .catch(err => console.log("Error while getting the data: ", err))


function printTheChart(stockData) {

    const dailyData = stockData.bpi
    const stockDates = Object.keys(dailyData)

    const stockDatas = Object.values(dailyData)
    const stockPrices = stockDatas.map(data => data)
    minValue.innerHTML = `${Math.min(...stockPrices)} ${currency}`
    maxValue.innerHTML = `${Math.max(...stockPrices)} ${currency}`

    console.log(Math.min(...stockPrices), Math.max(...stockPrices))

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