// const axiosApp = axios.create({ baseURL: `https://api.coindesk.com/v1/bpi/historical/close.json?` })

function getApiInfo(apiData) {
    const startDate = document.getElementById("start").value
    const endDate = document.getElementById("end").value
    const currencyValue = document.getElementById("currency").value


    // console.log(`el valor de startDate es: ${startDate} y ${endDate}`)

    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currencyValue}`)
        .then(responseFromAPI => printTheChart(responseFromAPI.data))
        .catch(err => console.log("Error while getting the data: ", err))
}

function printTheChart(apiData) {
    const dailyData = apiData["Bitcoin Price Index"]

    const keyDates = Object.keys(apiData.bpi)
    const valueDates = Object.values(apiData.bpi)

    const max = Math.max(...valueDates)
    document.getElementById("maxValue").innerText = max
    const min = Math.min(...valueDates)
    document.getElementById("minValue").innerText = min


    const ctx = document.getElementById("myChart").getContext("2d")

    new Chart(ctx, {
        type: "line",
        data: {
            labels: keyDates,
            datasets: [
                {
                    label: "Stock Chart",
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: valueDates
                }
            ]
        }
    })
}


document.getElementById("start").onchange = () => getApiInfo()
document.getElementById("end").onchange = () => getApiInfo()
document.getElementById("currency").onchange = () => getApiInfo()

