const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json';
let startDate = (document.querySelector('#start-date').value = '');
let endDate = (document.querySelector('#end-date').value = '');

axios
    .get(apiUrl)
    .then((resp) => {
        printChart(resp.data.bpi);
    })
    .catch((err) => {
        console.log(err);
    });

const printChart = (bpi) => {
    // data for the x axes
    const bitCoinDates = Object.keys(bpi);
    console.log('BitCoinDates (x)', bitCoinDates);

    //data for the y axes
    const bitCoinPrices = bitCoinDates.map((date) => {
        return bpi[date];
    });
    console.log('BitCoinPrices (y)', bitCoinPrices);
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: bitCoinDates,
            datasets: [
                {
                    label: 'BitCoin Price Index',
                    backgroundColor: 'rgb(80,200,120)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: bitCoinPrices,
                },
            ],
        },
    });
    maxMin(bitCoinPrices);
};

const dateSearch = () => {
    startDate = document.querySelector('#start-date').value;
    endDate = document.querySelector('#end-date').value;
    console.log('Start date', startDate);
    console.log('End date', endDate);
    axios
        .get(apiUrl + `?start=${startDate}&end=${endDate}`)
        .then((resp) => {
            printChart(resp.data.bpi);
        })
        .catch((err) => {
            console.log(err);
        });
};

const currencyChange = () => {
    let currency = document.querySelector('#currency').value;
    console.log('currency', currency);
    axios
        .get(apiUrl + `?currency=${currency}`)
        .then((resp) => {
            printChart(resp.data.bpi);
        })
        .catch((err) => {
            console.log(err);
        });
};

const maxMin = (bpi) => {
    const maxValue = Math.max(...bpi).toFixed(2);
    const minValue = Math.min(...bpi).toFixed(2);

    document.querySelector('#max').innerText = maxValue;
    document.querySelector('#min').innerText = minValue;
};
