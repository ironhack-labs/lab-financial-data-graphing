const bitcoinApi = axios.create({
    baseURL: "https://api.coindesk.com/v1/bpi/historical/close.json"
})


async function getBitcoins() {
    try {
        const { data : { bpi } } = await bitcoinApi.get();
        console.log("DATA:", bpi)
        return bpi
    } catch (err) {
        console.error(err)
    }
}

async function bpiChart(url) {
    try {
        const bpiData = await getBitcoins(url)
        const canvas = document.querySelector("#bpi-canvas").getContext("2d");
        const dates = Object.keys(bpiData)
        console.log("dates:", dates)
        const prices = Object.values(bpiData)
        console.log("prices", prices)

        const chart = new Chart(canvas, {
            type: "line", 
            data: {
                labels: dates,
                datasets: [{
                    label: "Bitcoin Prices", 
                    data: prices, 
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ], 
                }]
            }
        })
    } catch (err) {
        console.error(err)
    }
}

bpiChart()


async function datesChart() {
    try {
        const {value: startDate} = document.querySelector('#start-date')
        const { value: endDate } = document.querySelector('#end-date')
        const { data : { bpi } }  = await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
        console.log("BPIDATA",bpi)
        const canvas = document.querySelector("#bpi-canvas").getContext("2d");
        const dates = Object.keys(bpi)
        const prices = Object.values(bpi)

        const chart = new Chart(canvas, {
            type: "line", 
            data: {
                labels: dates,
                datasets: [{
                    label: "Filtered Bitcoin Prices", 
                    data: prices, 
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',

                    ], 
                }]
            }
        })
    } catch (err) {
        console.error(err)
    }
}

const startInput = document.querySelector('#start-date')
const endInput = document.querySelector('#end-date')
startInput.addEventListener("change", datesChart)
endInput.addEventListener("change", datesChart)

async function currencyFilter() {
    try {
        const currency = document.querySelector('.currency').value
        console.log("choice", currency)
        const { data : { bpi } } = await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`) 
        console.log('BPI,', bpi)

    } catch (err) {
        console.error(err)
    }
}

const currency = document.querySelector('.currency')
currency.addEventListener('change', currencyFilter)