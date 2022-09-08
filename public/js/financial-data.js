const apiURL = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-10-10&end=2017-11-10'




axios
    .get(apiURL)
    .then((price) => {
        const data = {
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: price.data.bpi
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


    })
    .catch((err) => console.log('Error while getting the data: ', err));



