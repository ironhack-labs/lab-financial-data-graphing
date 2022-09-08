

axios
    .get('http://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2014-07-01')
    .then((apiResponse) => {

        const data = {
            datasets: [{
                label: 'Bitcoin Price',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: apiResponse.data.bpi
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
    .catch(e => console.log(e))

    


