const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const currency = document.getElementById("currency");

const maxValue = document.getElementById("maxValue");
const minValue = document.getElementById("minValue");

// console.log(currency.value);

window.onload = () => {
    getBitocoinData()
}

startDate.addEventListener('input', event => {
    // console.log({event});
    startDate.value = event.srcElement.value;
    getBitocoinData();
});

endDate.addEventListener('input', event => {
    // console.log({event});
    endDate.value = event.srcElement.value;
    getBitocoinData();
});

currency.addEventListener('change', event => {
    currency.value = event.target.value;
    console.log(currency.value);
    getBitocoinData();
})

const getBitocoinData = () => {

    let apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency.value}`;

    if (startDate || endDate) {
        apiUrl += `&start=${startDate.value}&end=${endDate.value}`;
    }
    
    axios
      .get(apiUrl)
      .then(responseFromAPI => {
    
            console.log('The response from API: ', responseFromAPI);
            printTheChart(responseFromAPI.data.bpi);
    
        })
      .catch(err => console.log('Error while getting the data: ', err));
}

function printTheChart(stockData) {

    const stockDates = Object.keys(stockData);
    const stockPrices = stockDates.map((date) => stockData[date]);

    // console.log(stockPrices);

    maxValue.innerHTML = `Max: ${Math.max(...stockPrices)}`;
    minValue.innerHTML = `Min: ${Math.min(...stockPrices)}`;

    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: stockDates,
            datasets: [
                {
                    label: "Bitcoin Chart",
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                    ],
                    borderWidth: 1,
                    data: stockPrices,
                },
            ],
        },
    }); // closes chart = new Chart()
} // closes printTheChart()

