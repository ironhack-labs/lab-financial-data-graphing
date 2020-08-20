// ITERATION 1 & 2
// let data;
// const values = [];
// const labels = [];

// axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
// .then(responseFromAPI => {
//     data = responseFromAPI.data.bpi;
//     for (const property in data) {
//         values.push(data[property])
//         labels.push(property)
//     }
//     console.log(values)
//     console.log(labels)
// })
// .catch(err => console.log('Error loading data: ',err))

// var ctx = document.getElementById('myChart').getContext('2d');
// var chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: 'line',

//     // The data for our dataset
//     data: {
//         labels: labels,
//         datasets: [{
//             label: 'Coin Desk Info',
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: values
//         }]
//     },

//     // Configuration options go here
//     options: {}
// });


// ITERATION 3, 4 & 5

function showData(start, end){
    let data;
    const values = [];
    const labels = [];

    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
    .then(responseFromAPI => {
        data = responseFromAPI.data.bpi;
        for (const property in data) {
            values.push(data[property])
            labels.push(property)
        }
        drawChart(labels, values)
        document.getElementById('min-max').innerText = `MIN: ${Math.min(...values)}, MAX: ${Math.max(...values)}`

    })
    .catch(err => console.log('Error retrieving specific dates: ', err))
}

function showCurrencyData(currency){

    axios.get(`https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`)
    .then(responseFromAPI => {
        const data = responseFromAPI.data.bpi
        const currencyData = data[currency]
        const currencyCode = currencyData.code 
        const currencyRate = currencyData.rate 

        document.getElementById('currency-rate').innerText = `1 BTC = ${currencyRate} ${currencyCode}`
    })
    .catch(err => console.log('Error retrieving specific dates: ', err))
}


document.getElementById('find-dates').addEventListener('click', () =>{
    const startDate = document.getElementById('start-date').value
    const endDate = document.getElementById('end-date').value

    showData(startDate, endDate);
})


function drawChart(labels, values){
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',

        data: {
            labels: labels,
            datasets: [{
                label: 'Coin Desk Info',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: values
            }]
        },

        options: {}
    });
}

document.getElementById('find-currency').addEventListener('click', () =>{
    const currency = document.getElementById('currency-select').value

    showCurrencyData(currency);
})