function changedata() {

    let start = document.getElementById('start').value
    let end = document.getElementById('end').value

    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
        .then(responseFromAPI => printTheChart(responseFromAPI.data))
        .catch(err => console.log("Error while getting the data: ", err))





}





function printTheChart(stockData) {



    const dailyData = stockData.bpi

    const stockDates = Object.keys(dailyData)
    const stockPrices = Object.values(dailyData)



    const ctx = document.getElementById("myChart").getContext("2d")

    new Chart(ctx, {
        type: "line",
        data: {
            labels: stockDates,
            datasets: [
                {
                    label: "Stock Chart",
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: stockPrices
                }
            ]
        }
    })
}

document.getElementById("start").onchange = () => changedata()
document.getElementById("end").onchange = () => changedata()
