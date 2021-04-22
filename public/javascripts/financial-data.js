axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
    .then((response) => {
        const bitcoin = response.data.bpi;
        const date = Object.keys(bitcoin);
        const price = Object.values(bitcoin);

        printChart(date, price);

    }).catch((err) => {
        console.log(err);
    });

function printChart(date, price) {
    const ctx = document.getElementById('my-chart').getContext('2d');
    ctx.clearRect(0, 0, 700, 400);
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: date,
            datasets: [
                {
                    label: 'Stock Chart',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: price
                }
            ]
        }
    });
}

function dateFilter(startDate, endDate) {
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
        .then(responseFromAPI => {
            const bitcoin = responseFromAPI.data.bpi
            const date = Object.keys(bitcoin)
            const price = Object.values(bitcoin)

            printChart(date, price);

        })
        .catch(err => console.log('Error while getting the data: ', err));
}

document.getElementById('date-btn').addEventListener('click', () => {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    dateFilter(startDate, endDate);
});