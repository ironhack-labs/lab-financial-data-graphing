const ctx = document.getElementById('myChart').getContext('2d');
const start = document.getElementById('start')
const end = document.getElementById('end')
const currency = document.getElementById('currency')
const min = document.getElementById('min')
const max = document.getElementById('max')

let startDate = '2019-08-11';
let endDate = '2019-09-10';
let currencyValue = 'USD';
let minValue; 
let maxValue;



start.onchange = function(){
    startDate = start.value
    getBitcoinPrice()
}

end.onchange = function(){
    endDate = end.value
    getBitcoinPrice()
}

currency.onchange = function(){
    currencyValue = currency.value
    getBitcoinPrice()
}

async function getBitcoinPrice() {
    //API
    const coinDeskApi = axios.create({
        baseURL: `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currencyValue}`
    })
    const responseFromAPI = await coinDeskApi.get()
    const responseData = { ...responseFromAPI.data.bpi };
    const labels = Object.keys(responseData);
    const data = Object.values(responseData);
    minValue = Math.min.apply(null,data)
    maxValue = Math.max.apply(null,data)
    min.innerText = minValue
    max.innerText = maxValue
    //Chart
    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        //labels es x
        labels: labels,
        datasets: [{
            label: 'Bitcoin Price',
            backgroundColor: 'rgb(199, 186, 238)',
            borderColor: 'rgb(134, 102, 227)',
            data: data // es y
        }]
    },

    // Configuration options go here
    options: {}
    });
}

getBitcoinPrice();