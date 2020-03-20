let $start_date = document.querySelector('#start_date')
let $end_date = document.querySelector('#end_date')
let $button = document.querySelector('#button')

$button.addEventListener('click', () => {
    axios
        .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${$start_date.value}&end=${$end_date.value}`)
        .then((response => {
            let date = Object.keys(response.data.bpi)
            let price = Object.values(response.data.bpi)
            let ctx = document.getElementById('myChart').getContext('2d');
            let chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: date,
                    datasets: [{
                        label: 'bitcoin price',
                        // backgroundColor: 'rgb(255, 99, 132)',
                        // borderColor: 'rgb(255, 99, 132)',
                        data: price
                    }]
                },
            });
        }))
        .catch(err => {
            console.log(err);
        })
});