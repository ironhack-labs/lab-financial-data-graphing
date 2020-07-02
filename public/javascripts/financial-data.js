const key = "demo";
const functionName = "TIME_SERIES_DAILY";
const symbolName = "MSFT";
const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.jso`;

axios
    .get(apiUrl)
    .then(response => {
        console.log(response.data);
        printTheChart(response.data)
    })
    .catch(err => {
        console.log('Error while getting the data', err);
    })

    function printTheChart(stockData) {
        const dailyData = stockData['Time Series (Daily)'];
        // console.log('daily data:', dailyData);
        // this is the data for the x axis
        const stockDates = Object.keys(dailyData);
        console.log(stockDates);
        // this is the data for the y axis
        const stockPrices = stockDates.map(date => {
            return dailyData[date]['4. close'];
        });
        console.log('stock prices: ', stockPrices);
    
        const ctx = document.getElementById('myChart').getContext('2d');
    
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: stockDates,
                datasets: [
                    {
                        label: 'Bitcoin Stock Chart',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: stockPrices
                    }
                ]
            }
        })
    }