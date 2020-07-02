const api = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi',
});

const fetchHistoricalData = async () => {
    try {
        const { data } = await api.get('/historical/close.json');
        return data
    } catch (error) {
        console.error(error);
    }
}


const getHistoricalData = async () => {
    const result = await fetchHistoricalData()
    console.log(result)
    return result
}


const ctx = document.getElementById('myChart').getContext('2d');

const printChart = async () => {
    const data = await getHistoricalData()
    const dailyData = "Coins"
    //data for x
    const timeData = Object.keys(data.bpi)
    //data for y
    const coinsValue = Object.values(data.bpi)
    console.log('timeData', timeData)
    console.log('coinsValue', coinsValue)


    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeData,
            datasets: [{
                label: 'Biticoin Price Index',
                data: coinsValue,
                backgroundColor: [

                    'rgba(54, 162, 235, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',

                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });



}
printChart()