let apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json"
const chartContainer = document.querySelector("#chart")
const fromInput = document.querySelector("#fromDate")
const toInput = document.querySelector("#toDate")
const currencyInput = document.querySelector("#currency")
const button = document.querySelector("#search")

// const getDates = (fromDate, toDate, currency) => {
//     let apiUrl = ""
//     if (fromDate !== "" && toDate !== "" && currency !== "") {
//         apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`
//     } else {
//         apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json"
//     }
//     return apiUrl
// }

// console.log(getDates(fromInput, toInput, currencyInput))

// console.log(fromInput)

console.log(apiUrl)

let newChart = null

const printChart = bpiData => {
    const btcValue = Object.values(bpiData)
    const dates = Object.keys(bpiData)

    const ctx = chartContainer.getContext("2d")

    newChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [
                {
                    label: "Btc value",
                    backgroundColor: "rgb(255, 99, 132",
                    borderColor: "rgb(255, 99, 132",
                    data: btcValue,
                },
            ],
        },
    })
}

axios
    .get(apiUrl)
    .then(res => {
        printChart(res.data.bpi)
    })
    .catch(err => console.log(err))


const changeData = () => {
    apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${
        fromInput.value || fromInput.min
    }&end=${toInput.value || toInput.max}&currency=${
        currencyInput.value || "USD"
    }`
    console.log(apiUrl)

    newChart.destroy()

    axios
        .get(apiUrl)
        .then(res => {
            console.log(res.data.bpi)
            printChart(res.data.bpi)
        })
        .catch(err => console.log(err))
}

fromInput.addEventListener("change", () => {
    changeData()
})

toInput.addEventListener("change", () => {
    changeData()
})

currencyInput.addEventListener("change", () => {
    changeData()
})