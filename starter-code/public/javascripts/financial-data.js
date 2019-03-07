// const dateStart = "2018-02-15";
// const dateEnd = "2019-01-15";

const dateStart = document.getElementById('startDate');
const dateEnd = document.getElementById('endDate');


//axios.get(`https://api.iextrading.com/1.0/stock/${stockTicket}/chart`)
axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=<${dateStart}>&end<${dateEnd}>`)
    // console.log(response.data))
    .then(response => printTheChart(response.data))
    .catch(error => console.log(error));

const printTheChart = historicalData => {

    const dates = historicalData.map(element => element.bpi.keys());
    const prices = historicalData.map(element => element.bpi.values());

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: "Whatever",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: prices,
            }]
        }
    });
};