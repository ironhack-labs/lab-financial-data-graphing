//const apiUrl = `https://www.alphavantage.co/query?function=${functionName}&symbol=${symbolName}&apikey=${key}`;

const dateStartDOMEl = document.querySelector('#date-1')
const dateEndDOMEl = document.querySelector('#date-2')


dateStartDOMEl.addEventListener('change', () => {
    apiOnChange()
})
dateEndDOMEl.addEventListener('change', () => {
    apiOnChange()
})


window.onload(apiOnChange())


function apiOnChange() {
    const dateStart = dateStartDOMEl.value
    const dateEnd = dateEndDOMEl.value
    const apiUrl = `//api.coindesk.com/v1/bpi/historical/close.json?start=${dateStart}&end=${dateEnd}`
    //const apiUrl = '//api.coindesk.com/v1/bpi/historical/close.json?start=${dateStart}&end=${dateEnd}'
    axios
        .get(apiUrl)
        .then(responseFromAPI => {
            console.log(responseFromAPI)
            printTheChart(responseFromAPI.data); // <== call the function here where you used to console.log() the response
        })
        .catch(err => {
            console.log("Error while getting the data: ", err);
        });

}

function printTheChart(stockData) {
    const dailyData = stockData.bpi;

    const dates = Object.keys(dailyData)
    const values = Object.values(dailyData)


    // const stockDates = Object.keys(dailyData);
    // const stockPrices = stockDates.map(date => {
    //     return dailyData[date]["4. close"];
    // });

    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [{
                label: "Bitcoin Price",
                backgroundColor: "rgb(100, 100, 100)",
                borderColor: "rgb(255, 0, 0)",
                data: values
            }]
        }
    });
} //closes printTheChart()