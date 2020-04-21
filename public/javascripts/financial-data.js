const coindeskApi = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
})

const standardLoad = () => {
    coindeskApi
        .get()
        .then(response => printChart(response.data))
        .catch(error => alert('No se pudo procesar la solicitud'))
}

const filterLoad = () => {
    const startDate = document.getElementById('startDate').value
    const endDate = document.getElementById('endDate').value
    const receiveData = coindeskApi
    .get(startDate, endDate)
    .then(response => printChart(response.data))
    .catch(error => alert('No se pudo procesar la solicitud'))
}

const printChart = (receiveData) => {
    console.log('a',receiveData)
    const bpiData = receiveData.bpi
    console.log('bpi Data',bpiData)

    const bpiDataDates = Object.keys(bpiData)
    console.log('Dates',bpiDataDates)

    const bpiDataPrices = bpiDataDates.map(date => bpiData[date])
    console.log('Prices',bpiDataPrices)

    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: bpiDataDates,
            datasets: [
                {
                    label: "Bitcoin Price Index",
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: bpiDataPrices
                }
            ]
        }
    })
}


//getFinancialData()
standardLoad()
