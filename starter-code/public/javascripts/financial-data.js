const coinApi = axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')

    .then(response => {
        console.log(response.data)
        printTheChart(response.data)
    })
    .catch(err => {
        console.error(err)
    });

let printTheChart = (data) => {
    let stockLabels = Object.keys(data.bpi);
    let coinPrice = Object.values(data.bpi);
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: stockLabels,
            datasets: [{
                label: "Bitcoin price chart",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: coinPrice
            }]
        },

        // Configuration options go here
        options: {
            start: 2018-07-01,
            end: 2018-07-05
        }
    });
};

