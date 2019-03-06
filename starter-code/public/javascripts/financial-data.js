const from = document.getElementById(`from`)
const to = document.getElementById(`to`)
const currency = document.getElementById(`currency`)

from.addEventListener(`change`, () => mainPaint (from, to, currency))

to.addEventListener(`change`, () => mainPaint (from, to, currency))

currency.addEventListener(`change`, () => mainPaint (from, to, currency))

const mainPaint = (from, to, currency) => {
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${from.value}&end=${to.value}&currency=${currency.value}`)
    .then(response => printTheChart(response.data))
    .catch(error => console.log(error))

    const printTheChart = stockData => {
        console.log(stockData)
        const ctx = document.getElementById(`myChart`).getContext(`2d`)

        new Chart(ctx, {
            type: `line`,
            data: {
                labels: Object.keys(stockData.bpi),
                datasets: [{
                    label: `bitcoin price`,
                    data: Object.values(stockData.bpi),
                    backgroundColor: `rgb(255, 99, 132)`,
                    borderColor: `rgb(255, 99, 132)`,
                }]
            }
        })
    }
}