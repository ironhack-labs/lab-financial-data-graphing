
// const axiosApp = axios.create({ baseURL: `http://api.coindesk.com/v1/bpi/historical/close.json` })

axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
    //.then(response => console.log(response.data.bpi))
    .then(response => printChart(response.data.bpi))
    .catch(err => console.log('Ha habido un error ', err))

function printChart(data) {

    const dates = Object.keys(data)
    const prices = dates.map(date => data[date])

    const ctx = document.getElementById("myChart").getContext("2d")

    console.log(dates, prices)

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