axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    .then(response => printTheChart(response.data))
    .catch(error => console.log(error));

const printTheChart = stockData => {

    const stockLabels = Object.key.map(stockData);
    const stockPrice = Object.value.map(stockData);

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: stockLabels,
            datasets: [{
                label: "Whatever",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: stockPrice,
            }]
        }
    });
};




module.exports = app;
