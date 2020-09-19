/* const { response } = require('../../app'); */

const apiURL = 'http://api.coindesk.com/v1/bpi/historical/close.json';

const initDate = document.getElementById('init-date');
const endDate = document.getElementById('end-date');

function validate(event) {
    if (initDate.value.length < 9 || endDate.value.length < 9) { return; }

    const initValue = initDate.value.split('-');
    const endValue = endDate.value.split('-');
    initValue[1] -= 1;
    endValue[1] -= 1;

    const initNewDate = new Date(...initValue);
    const endNewDate = new Date(...endValue);
    if (endNewDate <= initNewDate) { return; }

    const currentURL = `${apiURL}?start=${initDate.value}&end=${endDate.value}`;
    console.log(currentURL);
    axios
        .get(currentURL)
        .then((response) => printChart(response))
        .catch((err) => console.log(err));
}

function printChart(data) {
    const ctx = document.getElementById('myChart').getContext('2d');

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(data.data.bpi),
            datasets: [
                {
                    label: 'Coindesk Chart',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: Object.values(data.data.bpi),
                },
            ],
        },
    });
}

initDate.oninput = () => { validate(); };

endDate.oninput = () => { validate(); };

/* axios
    .get(apiURL)
    .then((response) => printChart(response))
    .catch((err) => console.log(err)); */
