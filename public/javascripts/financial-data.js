let fromDate =document.getElementsByClassName('from')
let toDate = document.getElementsByClassName('to')
let currency = document.getElementsByClassName('currency')
let valuesDiv = document.getElementById('values')
console.log(currency);

document.addEventListener('change', () => {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=' + fromDate[0].value + '&end=' + toDate[0].value + '&currency=' + currency.currency.value)
    .then(response => {
        valuesDiv.innerHTML = '';
        printTheChart(response.data.bpi)
        const maxPrice = document.createElement('h4')
        const minPrice = document.createElement('h4')
        maxPrice.innerHTML = Math.max(...Object.values(response.data.bpi))
        minPrice.innerHTML = Math.min(...Object.values(response.data.bpi))
        valuesDiv.appendChild(maxPrice)
        valuesDiv.appendChild(minPrice)
        console.log(response);
})
    .catch(error => console.log(error))
})

axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=' + fromDate[0].value + '&end=' + toDate[0].value)
.then(response => {
    printTheChart(response.data.bpi)
    const maxPrice = document.createElement('h4')
    const minPrice = document.createElement('h4')
    maxPrice.innerHTML = Math.max(...Object.values(response.data.bpi))
    minPrice.innerHTML = Math.min(...Object.values(response.data.bpi))
    valuesDiv.appendChild(maxPrice)
    valuesDiv.appendChild(minPrice)
    console.log(response);
})
.catch(error => console.log(error))


function printTheChart(data) {
    let stockDates = [];
    let stockPrices = [];
    stockDates = Object.keys(data);
    stockPrices = Object.values(data)
    console.log(stockDates);
var ctx = document.getElementById('myChart').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: stockDates,
        datasets: [{
            label: 'Bitcoin Price Index',
            data: stockPrices,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
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
})
};


// {"bpi":{"2020-03-03":8768.18,"2020-03-04":8767.8867,"2020-03-05":9073.275,"2020-03-06":9165.1517,"2020-03-07":8905.9517,"2020-03-08":8050.1883,"2020-03-09":7944.45,"2020-03-10":7899.2267},"disclaimer":"This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as USD.","time":{"updated":"Mar 11, 2020 00:03:00 UTC","updatedISO":"2020-03-11T00:03:00+00:00"}}