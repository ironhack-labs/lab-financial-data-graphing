axios
    .get('http://api.coindesk.com/v1/bpi/historical/close.json')
    .then(responseFromApi => {
        printTheChart(responseFromApi.data.bpi);
    })
    .catch(err => console.log(err));



function printTheChart(bitcoinData) {
    const dates = Object.keys(bitcoinData);
    const values = Object.values(bitcoinData);

    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Bitcoin Value Evolution Chart',
                    data: values
                }
            ]
        }
    });
}