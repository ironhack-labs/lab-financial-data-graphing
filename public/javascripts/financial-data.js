const input = document.getElementsByTagName('input');
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");

window.onload = () => {
    getBitocoinData()
}

startDate.addEventListener('input', event => {
    console.log({event});
    startDate.value = event.srcElement.value;
    getBitocoinData()
});

endDate.addEventListener('input', event => {
    console.log({event});
    endDate.value = event.srcElement.value;
    getBitocoinData()
});

const getBitocoinData = () => {

    const rootApiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";

    if (startDate || endDate) {
        apiUrl = rootApiUrl + `?start=${startDate.value}&end=${endDate.value}`;
    } else {
        apiUrl = rootApiUrl;
    }
    
    axios
      .get(apiUrl)
      .then(responseFromAPI => {
    
            console.log('The response from API: ', responseFromAPI);
            // getBitocoinData();
            printTheChart(responseFromAPI.data.bpi);
    
        })
      .catch(err => console.log('Error while getting the data: ', err));
}





function printTheChart(stockData) {

    const stockDates = Object.keys(stockData);
    const stockPrices = stockDates.map((date) => stockData[date]);

    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: stockDates,
            datasets: [
                {
                    label: "Stock Chart",
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                    data: stockPrices,
                },
            ],
        },
    }); // closes chart = new Chart()
} // closes printTheChart()

