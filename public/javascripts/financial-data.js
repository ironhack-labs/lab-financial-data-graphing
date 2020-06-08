const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json';

axios
    .get(apiUrl)
    .then(apiResponse => {
        console.log(apiResponse);
        printChart(apiResponse.data.bpi)
    })
    .catch(err => console.log('Error getting data from API', err))


const printChart = graphData => {
    const dates = Object.keys(graphData);
    const prices = Object.values(graphData)
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Bitcoin Price Index Chart',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: prices
                }
            ]
        }
    })
}