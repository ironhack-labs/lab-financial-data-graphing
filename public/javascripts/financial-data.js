


function drawChart(xData, yData) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xData,
            datasets: [
                {
                    label: 'bitcoin value',
                    data: yData,
                    backgroundColor: 'white',
                    borderColor: 'black',
                    borderWidth: 1

                }
            ]
        }, 
    });
}

const selectStartDate = document.getElementById('start-date')
const selectEndDate = document.getElementById('end-date')
const dateFilter = document.getElementById('date')

// const startDate = '2016-12-01'
// const endDate = '2017-02-05'


function showChart(){
    const startDate = selectStartDate.value
    const endDate = selectEndDate.value

    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
        .then(response => {
            console.log(response)

            const xAxis = Object.keys(response.data.bpi) 
            const yAxis = Object.values(response.data.bpi)
            drawChart(xAxis, yAxis)
        })
        .catch(err => { console.log(err)})
}


dateFilter.addEventListener('change', event => {
    event.preventDefault()
    showChart()
})

showChart()