const drawChart = (labels, values) => {
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: [
                    'rgba(200, 210, 100, 0.5)'
                ],
                label: 'Stock chart',
                data: values
            }]
        },
    });
}

getBitcoinPriceChart = () => {
    const dateFromValue = dateFrom.value;
    const dateToValue = dateTo.value;
    const currencyVal = currency.value;
    console.log(currencyVal)
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currencyVal}&start=${dateFromValue}&end=${dateToValue}`)
        .then(response => {
            const labels = Object.keys(response.data.bpi);
            const values = Object.values(response.data.bpi);
            const mappedValues = values.map(val => Number(val))
            const maxPrice = Math.max(...mappedValues).toFixed(2);
            const minPrice = Math.min(...mappedValues).toFixed(2);
            document.getElementById('max-value').innerText = `Max: ${maxPrice} ${currencyVal}`;
            document.getElementById('min-value').innerText = `Min: ${minPrice} ${currencyVal}`;

            drawChart(labels, values);
        })
}

const dateFrom = document.getElementById('from');
const dateTo = document.getElementById('dateTo');
const currency = document.getElementById('currency');

dateFrom.onchange = () => {
    getBitcoinPriceChart()
}
dateTo.onchange = () => {
    getBitcoinPriceChart()
}
currency.onchange = () => {
    getBitcoinPriceChart()
}

getBitcoinPriceChart();