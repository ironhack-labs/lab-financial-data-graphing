
const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json'

axios
    .get(apiUrl)
    .then(responseFromAPI => {
        printTheChart(responseFromAPI.data); // <== call the function here where you used to console.log() the response
    })
    .catch(err => console.log('Error while getting the data: ', err));

function printTheChart(bitCoinData) {
    const dailyData = bitCoinData['bpi'];
    const stockDates = Object.keys(dailyData);
    const stockPrices = stockDates.map(date => dailyData[date]);
    const ctx = document.getElementById('my-chart').getContext('2d');

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: stockDates,
            datasets: [
                {
                    label: 'Stock Chart',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: stockPrices
                }
            ]
        }
    }); // closes chart = new Chart()
} // closes printTheChart()

