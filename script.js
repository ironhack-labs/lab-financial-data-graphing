axios
    .get(
        `https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-01-01&end=2017-12-31`
    )
    .then((bpiData) => {
        var ctx = document.getElementById('myChart').getContext('2d');

        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: Object.keys(bpiData.data.bpi),
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: Object.values(bpiData.data.bpi)
                }]
            },
        })
    })
    .catch((error) => {
        console.log("Error is: ", error);
    })