let prices;
let dates;
window.onload = () => {
    const start = document.getElementById('startDate');
    const end = document.getElementById('endDate');
    start.addEventListener('input', getDate);
    end.addEventListener('input', getDate);
}
let startDate = '2018-08-19';
let endDate = '2018-09-19';


const drawChart = () => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'BPI',
                data: prices
            }]
        }
    });
};

const btcInfo = () => {
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    .then(data => {
        dates = Object.keys(data.data.bpi);
        prices = Object.values(data.data.bpi);
    })
    .then(() => drawChart())
    .catch(e => console.log(e));
};

const newData = () => {
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
    .then(data => {
        dates = Object.keys(data.data.bpi);
        prices = Object.values(data.data.bpi);
    })
    .then(() => drawChart())
    .catch(e => console.log(e));
};

const getDate = () => {
    startDate = document.getElementById('startDate').value;
    endDate = document.getElementById('endDate').value;
    newData();
};

document.addEventListener('DOMContentLoaded', btcInfo, false);
