const startDate = document.getElementById('start-date');
const stopDate = document.getElementById('stop-date');
const currency = document.getElementById('currency');
const minValue = document.getElementById('min-value');
const maxValue = document.getElementById('max-value');

axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
.then (responseFromAPI => {
printTheChart(responseFromAPI.data);
})
.catch(err => console.log(`Error from server: ${err}`));

function printTheChart(stockData){
    const ctx = document.getElementById('my-chart').getContext('2d');
    const dailyData = stockData.bpi;
    const stockDates = Object.keys(dailyData);
    const stockPrices = stockDates.map((date)  => dailyData[date]);
    
    minValue.innerHTML = Math.min(...stockPrices);
    maxValue.innerHTML = Math.max(...stockPrices);

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: stockDates,
            datasets: [
                {
                    label:'Bitcoin Price Index',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: stockPrices,
                },
            ],
        }
    })
}

startDate.addEventListener("change", () => {
        startDate.value = document.getElementById("start-date").value;
        printTheFilteredChart();
    })
stopDate.addEventListener("change", () => {
        stopDate.value = document.getElementById("stop-date").value;
        printTheFilteredChart();
    })
currency.addEventListener("change", () => {
        currency.value = document.getElementById("currency").value;
        console.log(currency.value);
        printTheFilteredChart();
})
function printTheFilteredChart(){
    let apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency.value}`;
    if (startDate && stopDate) {
        apiUrl += `&start=${startDate.value}&end=${stopDate.value}`;
    } 
    axios.get(apiUrl)
    .then(responseFromAPI => {
        printTheChart(responseFromAPI.data)
    })
    .catch(error => console.log('Error while getting the data: ', error));
}



