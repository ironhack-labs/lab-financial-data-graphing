//Global variables declaration 

const inputs = document.querySelectorAll("input")
const currency = document.getElementById("currency")
const error = document.getElementById("error")

const max = document.getElementById("max")
const min = document.getElementById("min")

let prices

setChart()
setListeners()

function setChart() {

    if (inputs[0].value > inputs[1].value) error.innerText = "La fecha inicial no puede ser mayor que la final"
    else error.innerText = ""


    const axiosApp = axios.create({ baseURL: `http://api.coindesk.com/` })

    axiosApp.get(`v1/bpi/historical/close.json?start=${inputs[0].value}&end=${inputs[1].value}&currency=${currency.value}`)
        .then(response => printChart(response.data.bpi))
        .then(x => setMaxMin())
        .catch(err => console.log('Ha habido un error ', err))
}

function setListeners() {
    inputs.forEach(elm => elm.onchange = () => setChart())

    currency.onchange = () => setChart()
}

function printChart(data) {

    const dates = Object.keys(data)
    prices = dates.map(date => data[date])

    const ctx = document.getElementById("myChart").getContext("2d")

    new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [
                {
                    label: "Bitcoin",
                    backgroundColor: "pink",
                    borderColor: "yellow",
                    data: prices
                }
            ]
        }
    })

}

function setMaxMin() {
    console.log(prices)

    max.innerText = "Max: " + Math.max(...prices).toFixed(2) + " " + currency.value
    min.innerText = "Min: " + Math.min(...prices).toFixed(2) + " " + currency.value
}