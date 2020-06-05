const boton = document.getElementById('search')

boton.addEventListener('click', () => {
    const {
        value: from
    } = document.getElementById('from')
    const to = document.getElementById('to').value
    const currency = document.getElementById('currency').value
    printChart(from, to, currency)
})


function printChart(from, to, currency) {
    let apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?`;
    if (from && to) {
        apiUrl += `start=${from}&end=${to}&currency=${currency}`;
    }

    axios
        .get(apiUrl)
        .then(responseFromAPI => {
            printTheChart(responseFromAPI.data.bpi); // <== call the function here where you used to console.log() the response
        })
        .catch(err => console.log('Error while getting the data: ', err));

    function printTheChart(stockData) {
        const stockDates = Object.keys(stockData);
        const stockPrices = Object.values(stockData)
        const max = document.getElementById('max');
        const min = document.getElementById('min');
        max.innerHTML = Math.max(...stockPrices).toFixed(2) + ' ' + currency;
        min.innerHTML = Math.min(...stockPrices).toFixed(2) + ' ' + currency;
        const ctx = document.getElementById('myChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: stockDates,
                datasets: [{
                    label: 'Bitcoin Price Index',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132)',
                    data: stockPrices
                }]
            }
        }); //closes chart = new Chart()
    } // closes printTheChart()
}






/*myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: stockDates,
        datasets: [{
            label: 'Bitcoin Price Index',
            data: stockPrices,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
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
})*/