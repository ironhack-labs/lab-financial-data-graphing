axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
    .then(data => {
        console.log(data.data)
        showChart(data.data.bpi)
    })
    .catch(e => console.log(e))

function showChart(data) {
    
    const dates = Object.keys(data)
    const prices = Object.values(data)
    
    const ctx = document.getElementById('chart').getContext('2d')

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: dates,
        datasets: [
            {
            label: 'Bitcoin chart',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: prices
            }
        ]
        }
    })
} 
