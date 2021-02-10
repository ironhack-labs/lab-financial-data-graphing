const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json`
//const currencyUrl = `https://api.coindesk.com/v1/bpi/currentprice/<CODE>.json`

axios.get(apiUrl)
    .then(responseFromAPI => {
        console.log('responseFromAPI: ', responseFromAPI);
        printTheChart(responseFromAPI.data)
    })
    .catch(err => console.log('Error while getting the data: ', err))


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