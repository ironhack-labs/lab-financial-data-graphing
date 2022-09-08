axios
    .get('https://api.coindesk.com/v1/bpi/historical/close.json?start=2020-03-01&end=2020-03-31')
    .then(response => {
        const data = {
            datasets: [{
                label: 'Bitcoin Prices',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: response.data.bpi,
            }]
        };
        const config = {
            type: 'line',
            data: data,
            options: {}
        };
        const myChart = new Chart(
            document.getElementById('myChart'),
            config
        );
        console.log(response.data)
    })
    .catch(err => console.log(err));
















