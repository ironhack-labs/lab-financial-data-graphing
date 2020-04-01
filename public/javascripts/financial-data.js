
const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`

const divMaxValue = document.querySelector('#max-value');
const divMinValue = document.querySelector('#min-value');



axios
    .get(apiUrl)
    .then(responseFromAPI => {
    printTheChart(responseFromAPI.data)
    })
    .catch(err => {
    console.log("Error while getting the data: ", err);
    });



function printTheChart(stockData) {
    const dailyData = stockData.bpi;

    const stockDates = Object.keys(dailyData);
    const stockPrices = stockDates.map(date => {
        return dailyData[date];
    });

    const maxValue = Math.max(...stockPrices)
    const minValue = Math.min(...stockPrices)
    const newValueMax = document.createElement('h4')
    const newValueMin = document.createElement('h4')

    clearValues(); 
    if (stockData.disclaimer.includes('EUR')){
        newValueMax.innerHTML = maxValue.toFixed(2) + ' EUR';
        newValueMin.innerHTML = minValue.toFixed(2) + ' EUR';
        divMaxValue.appendChild(newValueMax)
        divMinValue.appendChild(newValueMin)
    } else {
        newValueMax.innerHTML = maxValue.toFixed(2) + ' USD';
        newValueMin.innerHTML = minValue.toFixed(2) + ' USD';
        divMaxValue.appendChild(newValueMax)
        divMinValue.appendChild(newValueMin)

    }



    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "line",
        data: {
        labels: stockDates,
        datasets: [
            {
            label: "Bitcoin price index",
            backgroundColor: "rgb(126,168,68)",
            borderColor: "rgb(12,89,75)",
            data: stockPrices
            }
        ]
        }
    }); // closes chart = new Chart()
} // closes printTheChart()

function clearValues() {
    divMaxValue.innerHTML = ''
    divMinValue.innerHTML = ''

}

document.querySelector('#go-btn').onclick = () => {
    const endDate = document.querySelector('#end-date').value
    const startDate = document.querySelector('#start-date').value;
    const currency = document.querySelector('#currency-selector').value
    if (endDate && startDate) {
        axios
            .get(apiUrl + '?start=' + startDate + '&end=' + endDate + `&currency=${currency}`)
            .then(responseFromAPI => {
            printTheChart(responseFromAPI.data)
            })
            .catch(err => {
            console.log("Error while getting the data: ", err);
            });
    } else {
        axios
        .get(apiUrl + `?currency=${currency}`)
        .then(responseFromAPI => {
        printTheChart(responseFromAPI.data)
        })
        .catch(err => {
        console.log("Error while getting the data: ", err);
        });
    }
}


