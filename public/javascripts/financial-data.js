console.log('JS Connected');

window.addEventListener('load', getElements)
const showBtn = document.getElementById('showBtn');
showBtn.addEventListener('click', getElements)

function getElements(){
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const currency = document.getElementById('currencySelector').value;
    getData(startDate, endDate, currency);
}

function getData(startDate, endDate, currency) {
    let apiUrl = ``;

    if(!startDate || !endDate){
        apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`
    } else {
        apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`
    }
    
    axios
        .get(apiUrl)
        .then(apiResponse => printChart(apiResponse.data.bpi, currency))
        .catch(err => console.log('Error getting data from API', err))
}

function printChart(graphData, currency) {
    const dates = Object.keys(graphData);
    const prices = Object.values(graphData);

    const maxValue = document.getElementById('maxValue');
    maxValue.innerHTML = Math.max(...prices) + " " + currency;
    const minValue = document.getElementById('minValue');
    minValue.innerHTML = Math.min(...prices) + " " + currency;

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