const stockTicket = "amzn";

axios.get(`https://api.iextrading.com/1.0/stock/${stockTicket}/chart`)
    .then(response => printTheChart(response.data))
    .catch(error => console.log(error));

const printTheChart = stockData => {

    const stockLabels = Object.key.map(element => element.date);
    const stockPrice = Object.value.map(element => element.close);

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