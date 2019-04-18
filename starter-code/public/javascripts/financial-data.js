const printChart = (labels, prices) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    label: 'Stock Chart',
                    data: prices
                }
            ]
        }
    });
};

const getApi = (startDate, endDate) => {
    axios
        .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
        .then(res => {
            console.log('start: ', startDate);
            console.log('end: ', endDate);
            const { bpi } = res.data;
            const dates = Object.keys(bpi);
            const prices = Object.values(bpi);

            printChart(dates, prices);
        })
        .catch(err => {
            console.error(err);
        });
};

const getData = () => {
    let startDate = '';
    let endDate = '';

    const startInput = document.getElementById('start-date');
    startInput.addEventListener('change', e => {
        startDate = e.target.value;
    });

    const endInput = document.getElementById('end-date');
    endInput.addEventListener('change', e => {
        endDate = e.target.value;
        getApi(startDate, endDate);
    });
};

getData();
