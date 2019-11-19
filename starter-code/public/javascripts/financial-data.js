const startDate = 2000-01-01;
const endDate = 2019-01-01;

const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`;
axios
    .get(apiUrl)
    .then(responseFromAPI => {
        console.log(responseFromAPI.data.bpi);
        printTheChart(responseFromAPI.data.bpi);
    })
    .catch(err => {
        console.log("Error while getting the data: ", err);
    });
function printTheChart(stockData) {
    const dailyData = stockData;
    const stockDates = Object.keys(dailyData);
    const stockPrices = Object.values(dailyData)
 
    // debugger
    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: stockDates,
            datasets: [
                {
                    label: "Stock Chart",
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    fill: false,
                    data: stockPrices
                }
            ]
        }
    }); // closes chart = new Chart()
} // closes printTheChart()
