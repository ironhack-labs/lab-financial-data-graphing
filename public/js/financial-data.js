const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`
console.log(apiUrl)

const printChart = stockData => {
    const dailyData = stockData.data.bpi
    console.log(dailyData)

    const stockDates = Object.keys(stockData.data.bpi)
    console.log(stockDates)

    const stockPrices = stockDates.map(date => {
        return dailyData[date];
    })
    console.log(stockPrices)

    const ctx = document.querySelector('#myChart').getContext('2d');

new Chart(ctx, {
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
})

}


axios.get(apiUrl)
	.then(response => {
		// console.log(response.data);
		printChart(response)
	})
	.catch(err => {
		console.log(err);
	})