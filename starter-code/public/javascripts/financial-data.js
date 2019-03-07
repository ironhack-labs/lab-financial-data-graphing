

axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    .then(response => printTheChart(response.data.bpi))
    .catch(error => console.log(error));

const printTheChart = stockData => {

    const stockLabels =Object.keys(stockData)
    const stockPrice = Object.values(stockData)

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: stockLabels,
            datasets: [{
                label: "CoinDesk",
                backgroundColor: 'rgb(70, 151, 152)',
                borderColor: 'rgb(70, 151, 152)',
                data: stockPrice,
            }]
        }
    });
};