

let apiUrl = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2021-08-01&end=2021-09-01'

axios
    .get(apiUrl)
    .then((dateValue) => {
        console.log('The response from API: ', dateValue.data);

        const data = {
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: dateValue.data.bpi
            }]
        };

        const config = {
            type: 'line',
            data: data,
            options: {}
        }


        const myChart = new Chart(
            document.getElementById('myChart'),
            config
        );

    })
    .catch((err) => console.log('Error while getting the data: ', err));
