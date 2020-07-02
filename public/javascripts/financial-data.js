const key = "demo";
const functionName = "TIME_SERIES_DAILY";
const symbolName = "MSFT";
const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=2020-01-01&end=2020-07-01&currency=USD`;

axios
    .get(apiUrl)
    .then(response => {
        //console.log(response.data);

        const bitcoinData = response.data.bpi;

        //console.log(bitcoinData);
        
        const dates = Object.keys(bitcoinData)
        const values = Object.values(bitcoinData)
        
        printTheChart(dates, values);
    })
    .catch(err => {
        console.log('Error while getting the data', err);
    })

    function printTheChart(dates, values) {
        const ctx = document.getElementById('myChart').getContext('2d');
        ctx.clearRect(0, 0, 700, 400);
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: 'Stock Chart',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: values
                    }
                ]
            }
        }); // closes chart = new Chart()
    }; // closes printTheChart()
    
    //document.getElementById('canvas-update').addEventListener('click', () => {
        //getBitcoinValue();
   