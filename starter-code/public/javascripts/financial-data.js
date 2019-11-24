axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    .then(res => {
        createChart(Object.keys(res.data.bpi), Object.values(res.data.bpi))
    })

createChart = (date, data) => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date,
            datasets: [{
                label: 'Value bitcoin',
                data: data,
                backgroundColor: [
                    'lightgrey'
                ],
                borderColor: [
                    'black'
                ],
                borderWidth: 3
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
    });
}

function updateChart(start, end) {
    start = document.getElementById('start').value || "2019-01-01"
    end = document.getElementById('end').value || "2019-03-03"

    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
        .then(res => {
            createChart(Object.keys(res.data.bpi), Object.values(res.data.bpi))
        })
}