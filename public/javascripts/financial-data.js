//GET data from API
const getDataInfo = (url) => {
    axios
    .get(url)
    .then((response) => {
        //console.log(response.data.bpi)
        const data = response.data.bpi
        const xAxis = Object.keys(data)
        //console.log(xAxis)
        const yAxis = Object.values(data)
        //console.log(yAxis)
        
        paintData(xAxis, yAxis)
        max_minValue(yAxis)
    })
    .catch((e) => console.log(e))
}

const paintData = (xAxis, yAxis) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xAxis,
            datasets: [{
                data: yAxis,
                label: 'Bitcoin Price Index',
                borderColor: "green",
                backgroundColor: "transparent"
            }]
        }, 
    })
}

const max_minValue = (yAxis) => {
    let max = Math.max(...yAxis)
    let min = Math.min(...yAxis)
    //console.log(max)
    //console.log(min)
    const maxValue = document.getElementById('maxValue')
    const minValue = document.getElementById('minValue')

    maxValue.innerHTML = max
    minValue.innerHTML = min
}

const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`

getDataInfo(apiUrl)

document.getElementById('getValueBtn').addEventListener('click', () => {
    let startDate = document.getElementById('startValue').value
    let endDate = document.getElementById('endValue').value
    const datesFilterUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`
    getDataInfo(datesFilterUrl)
    //console.log(datesFilterUrl)
    //console.log(startDate)
})

document.getElementById('currency').addEventListener('input', () => {
    let currency = document.getElementById('currency').value
    let startDate = document.getElementById('startValue').value
    let endDate = document.getElementById('endValue').value
    const currencyUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`
    getDataInfo(currencyUrl)
    //console.log(currencyUrl)
})



    
