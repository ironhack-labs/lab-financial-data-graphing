
// const axiosApp = axios.create({ baseURL: `http://api.coindesk.com/v1/bpi/historical/close.json?` })



function getFilter() {
    let fromValue = document.getElementById('from').value;
    let toValue = document.getElementById('to').value;
    let currencyValue = document.getElementById('currency').value;

    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromValue}&end=${toValue}&currency=${currencyValue}`)
        .then(responseFromAPI => {
            printTheChart(responseFromAPI.data)

            let arr = Object.values(responseFromAPI.data.bpi);
            let min = Math.min(...arr);
            let max = Math.max(...arr);
            console.log(min, max)
            maxtext = document.getElementById('max')
            maxtext.innerText = `Max: ${max}`
            mintext = document.getElementById('min')
            mintext.innerText = `Min: ${min}`

        })
        .catch(err => console.log("Error while getting the data: ", err))
}


function printTheChart(stockData) {

    const dailyData = stockData["bpi"]

    const stockDates = Object.keys(dailyData)
    const stockPrices = stockDates.map(date => dailyData[date])

    const ctx = document.getElementById("myChart").getContext("2d")

    new Chart(ctx, {
        type: "line",
        data: {
            labels: stockDates,
            datasets: [
                {
                    label: "Stock Chart",
                    backgroundColor: "rgb(93, 198, 62)",
                    borderColor: "rgb(0, 0, 0)",
                    data: stockPrices
                }
            ]
        }
    })
}



