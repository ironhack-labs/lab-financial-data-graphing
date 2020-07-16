// API ENPOINT WITH DATES
// 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05';

const inputDateFrom = document.getElementById('dateFrom');
const inputDateTo = document.getElementById('dateTo');
const currencySelect = document.getElementById('currency')
const endpoint = 'https://api.coindesk.com/v1/bpi/historical/close.json';

function getDates() {
    const dateFrom = inputDateFrom.value;
    const dateTo = inputDateTo.value;
    const currency = currencySelect.value
    return `${endpoint}?start=${dateFrom}&end=${dateTo}&currency=${currency}`;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    console.log('formated date', [year, month, day].join('-'));
    return [year, month, day].join('-');
}

function printChart(response) {
    const labels = Object.keys(response.data.bpi)
    const ctx = document.getElementById('myChart').getContext('2d');
    const data = Object.values(response.data.bpi)
    const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: labels,
            datasets: [{
                label: 'Bitcoin Price',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data
            }]
        },

        // Configuration options go here
        options: {}
    });
}

axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
    .then(responseFromApi => {
        printChart(responseFromApi);
    })
    .catch(error => console.error(error))

inputDateFrom.addEventListener('change', () => {

    if (inputDateTo.value !== '') {
        axios
            .get(getDates())
            .then((responseFromApi) => {
                printChart(responseFromApi);
            })
            .catch(err => console.log('err', err));
    };
});

inputDateTo.addEventListener('change', () => {
    if (inputDateFrom.value !== '') {
        axios
            .get(getDates())
            .then((responseFromApi) => {
                printChart(responseFromApi);
            })
            .catch(err => console.log('err', err));
    };
});

currencySelect.addEventListener('change', () => {
    if (inputDateFrom.value !== '' && inputDateTo !== '') {
        axios
            .get(getDates())
            .then((responseFromApi) => {
                printChart(responseFromApi);
            })
            .catch(err => console.log('err', err));
    };
});