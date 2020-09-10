const printTheChart = (data) => {
    console.log(data);
    const dailyData = data.bpi;
    console.log(dailyData);
    const dates = Object.keys(dailyData);
    console.log({ dates })
    const coinValues = dates.map(date => dailyData[date]);
    console.log({ coinValues });

    const maxValue = Math.max(...coinValues).toFixed(2);
    console.log(maxValue);
    const minValue = Math.min(...coinValues).toFixed(2);
    console.log(minValue);

    const currency = document.getElementById('currency').value; 

    document.getElementById('min').innerText = 'Minimum: ' + minValue + ' ' + currency;
    document.getElementById('max').innerText = 'Maximum: ' + maxValue + ' ' + currency;

    const ctx = document.getElementById('bitcoinChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates, 
            datasets: [
                {
                 label: 'Bitcoin Chart',
                 backgroundColor: 'rgb(255, 99, 132)',
                 borderColor: 'rgb(255, 99, 132)',
                 data: coinValues
                }
            ]
        }
    })
}


const getCoinDate = () => {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const currency = document.getElementById('currency').value;
    console.log(currency);
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
        .then(response => {
            printTheChart(response.data);
        })
        .catch(error => console.log(error));
}

Window.onload = getCoinDate(document.getElementById('start-date').value,
document.getElementById('end-date').value);

document.getElementById('start-date').addEventListener('change', event => {
    getCoinDate();
});

document.getElementById('end-date').addEventListener('change', event => {
    getCoinDate();
})


document.getElementById('currency').addEventListener('change', event => {
    getCoinDate();
})
