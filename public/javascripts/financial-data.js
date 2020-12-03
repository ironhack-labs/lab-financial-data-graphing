const getBitcoinInfo = (startDate, endDate) => {
    axios
    .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
    .then(responseFromApi => {
        console.log(responseFromApi);
        printTheChart(Object.keys(responseFromApi.data.bpi), Object.values(responseFromApi.data.bpi));
        console.log(Object.values(responseFromApi.data.bpi));
    })
    .catch(error => console.log(error));
}

function printTheChart(date, price) {   
    const ctx = document.getElementById('my-chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date,
            datasets: [
                {
                label: 'Bitcoin Price Index',
                backgroundColor: 'rgb(13,87,155)',
                borderColor: 'rgb(13,87,155)',
                data: price
                }
            ]
        }
    });
};

document.getElementById('search').addEventListener('submit', event => {
    event.preventDefault();
    const startDate = document.getElementsByClassName('start-date')[0].value;
    const endDate = document.getElementsByClassName('end-date')[0].value;
    console.log(startDate);
    console.log(endDate);
    getBitcoinInfo(startDate, endDate);
});