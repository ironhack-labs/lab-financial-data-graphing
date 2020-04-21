
const startDateForm = document.getElementById('startDate')
const endDateForm = document.getElementById('endDate')
const requestButton = document.getElementById('sendRequest')

let startDate = startDateForm.value
let endDate = endDateForm.value

function equalValues(a, b) {
    a = b
}

// const query = `query?start=${startDate}&end=${endDate}`


function printChart(data) {
    const dailyData = data.bpi
    const stockDates = Object.keys(dailyData)
    const stockPrices = stockDates.map(date => dailyData[date])
    const ctx = document.getElementById('myCanvas').getContext("2d")
    
    new Chart(ctx,
        {
            type: 'line',
            data: {
                labels: stockDates,
                datasets: [{
                    label: 'bitcoin price',
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: stockPrices
                }]
            }
        }
        )
    }
    
    function getInfo() {
        startDate = startDateForm.value
        endDate = endDateForm.value
        const bitCoinAPI = axios.create({ baseURL: `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}` })
        bitCoinAPI.get()
        .then(response => printChart(response.data))
        .catch(err => console.log(`An error happened ${err}`))
    }
    
    getInfo()
    
    startDateForm.addEventListener('change', getInfo)
    endDateForm.addEventListener('change', getInfo)
    requestButton.addEventListener('click', getInfo)