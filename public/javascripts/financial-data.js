
const restBitcoinApi = axios.create({
    baseUrlA: "http://api.coindesk.com/"
})
let query = "http://api.coindesk.com/v1/bpi/historical/close.json"


axios
    .get(query)
    .then(responseFromApi => printTheChart(responseFromApi.data.bpi))
    .catch(error => console.log("Error al requerir la API", error))

function printTheChart(stockData) {
    const stockDates = Object.keys(stockData);
    console.log(stockData)
    const stockPrices = stockDates.map(date => {

        return stockData[date];
    });
    let ctx = document.getElementById("myChart").getContext("2d")

    new Chart(ctx, {
        type: "line",
        data: {
            labels: stockDates,
            datasets: [{
                label: 'Bitcoin',
                data: [12, 19, 3, 5, 2, 3],
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
                borderWidth: 1,
                data: stockPrices
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })
}
