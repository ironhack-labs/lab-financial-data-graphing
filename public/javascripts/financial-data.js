const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json`
let currency = 'USD';
//const currencyUrl = `https://api.coindesk.com/v1/bpi/currentprice/<CODE>.json`

// Iteration 1 - Axios Get Request
const getBPI = (url) => {
    axios.get(url)
    .then(responseFromAPI => {
        console.log('responseFromAPI: ', responseFromAPI);
        let chartColor = getCurrencyColor(currency);
        console.log(chartColor)
        printTheChart(responseFromAPI.data, chartColor);
        getMaxAndMin(responseFromAPI.data);
    })
    .catch(err => console.log('Error while getting the data: ', err))
}

// Iteration 2 - Printing the Chart
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

document.onload = (getBPI(apiUrl, 'rgba(22, 105, 122, 0.75)'));


// Iteration 3 - Filtering by date
document.getElementById('filter-by-date-btn').addEventListener('click', () => {
    let startDate = document.getElementById('start-date').value;
    let endDate = document.getElementById('end-date').value;
    getBPI(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`);
})

// Iteration 4 - Currency selection
document.getElementById('currency').addEventListener('input', () => {
    currency = document.getElementById('currency').value;
    getBPI(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`);
})


// Iteration 5 - Max/Min values
function getMaxAndMin(data) {
    const bpiHistory = data['bpi'];
    const bpiDates = Object.keys(bpiHistory);
    const bpiPrices = bpiDates.map(date => bpiHistory[date]);

    document.getElementById('max-value').innerHTML = Math.max(...bpiPrices).toFixed(2);
    document.getElementById('min-value').innerHTML = Math.min(...bpiPrices).toFixed(2);

    const currencyValue = document.getElementsByClassName('currency-value');
    [...currencyValue].forEach(element => element.innerHTML = currency.value)
}


function getCurrencyColor (currency) {
    switch(currency) {
        case 'USD':
            return 'rgba(22, 105, 122, 0.75)';
            break;
        case 'EUR':
            return 'rgba(219, 100, 0, 0.75)';
            break;
        case 'GBP':
            return 'rgba(239, 79, 79, 0.75)';
            break;
        default:
            return 'rgba(187, 187, 187, 0.75)';
    }
}