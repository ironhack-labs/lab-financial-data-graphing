const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json`
//const dateFilterUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`
//const currencyUrl = `https://api.coindesk.com/v1/bpi/currentprice/<CODE>.json`

// Axios Get Request
const getBPI = (url) => {
    axios.get(url)
    .then(responseFromAPI => {
        console.log('responseFromAPI: ', responseFromAPI);
        printTheChart(responseFromAPI.data)
    })
    .catch(err => console.log('Error while getting the data: ', err))
}

// Printing the Chart
function printTheChart(data) {
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
                    backgroundColor: 'rgba(22, 105, 122, 0.75)',
                    borderColor: 'rgba(22, 105, 122, 0.75)',
                    data: bpiPrices
                }
            ]
        }
    })
}

// Filtering by date

document.onload = (getBPI(apiUrl));

document.getElementById('filter-by-date-btn').addEventListener('click', () => {
    let startDate = document.getElementById('start-date').value;
    let endDate = document.getElementById('end-date').value;
    console.log(startDate, endDate);
    getBPI(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`);
})