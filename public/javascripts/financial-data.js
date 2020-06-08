const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json';

axios
    .get(apiUrl)
    .then(apiResponse => {
        console.log(apiResponse);
        printChart(apiResponse.data)
    })
    .catch(err => console.log('Error getting data from API', err))


const printChart = graphData => {
    const dailyData = graphData['Time Series (Daily)'];
    const stockDates = Object.keys(dailyData);
    const stockPrices = stockDates.map(date => dailyData[date]['4. close']);

    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new chart(ctx, {
        type: 'line',
        data: {
            labels: stockDates,
            datasets: [
                {
                    label: 'Bitcoin Price Index Chart',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: stockPrices
                }
            ]
        }
    })
}