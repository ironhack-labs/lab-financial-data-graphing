const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json`
//const currencyUrl = `https://api.coindesk.com/v1/bpi/currentprice/<CODE>.json`

// Axios Get Request
const getBPI = (url, chartColor) => {
    axios.get(url)
    .then(responseFromAPI => {
        console.log('responseFromAPI: ', responseFromAPI);
        printTheChart(responseFromAPI.data, chartColor)
    })
    .catch(err => console.log('Error while getting the data: ', err))
}

// Printing the Chart
function printTheChart(data, color) {
    const bpiHistory = data['bpi'];
    
    const bpiDates = Object.keys(bpiHistory);
    const bpiPrices = bpiDates.map(date => bpiHistory[date])

    const ctx = document.getElementById('bitcoin-price-index')
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: bpiDates,
            datasets: [
                {
                    label: 'Bitcoin Price',
                    backgroundColor: color,
                    borderColor: color,
                    data: bpiPrices
                }
            ]
        }
    })
}

// Filtering by date

document.onload = (getBPI(apiUrl, 'rgba(22, 105, 122, 0.75)'));

document.getElementById('filter-by-date-btn').addEventListener('click', () => {
    let startDate = document.getElementById('start-date').value;
    let endDate = document.getElementById('end-date').value;
    getBPI(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`);
})

document.getElementById('currency').addEventListener('input', () => {
    let currency = document.getElementById('currency').value;
    switch(currency) {
        case 'USD':
            chartColor = 'rgba(22, 105, 122, 0.75)';
            break;
        case 'EUR':
            chartColor = 'rgba(219, 100, 0, 0.75)';
            break;
        case 'GBP':
            chartColor = 'rgba(239, 79, 79, 0.75)';
            break;
        default:
            chartColor = 'rgba(187, 187, 187, 0.75)';
    }
    getBPI(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`, chartColor);
})