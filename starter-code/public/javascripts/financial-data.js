

// input from date variables
const dateFromDOMEl = document.querySelector("#date-from")
const dateToDOMEl = document.querySelector("#date-to")

let dateFrom;
let dateTo;
let apiUrl;


passDateValuesToAPI = function () {
    dateFrom = dateFromDOMEl.value
    dateTo = dateToDOMEl.value
    apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`;

    console.log(apiUrl);

    axios
        .get(apiUrl)
        .then(responseFromAPI => {
            console.log(responseFromAPI.data);
            printTheChart(responseFromAPI.data);
        })
        .catch(err => {
            console.log("Error while getting the data: ", err);
        });      
}

window.onload = passDateValuesToAPI
dateToDOMEl.addEventListener("change", passDateValuesToAPI)
dateFromDOMEl.addEventListener("change", passDateValuesToAPI)


function printTheChart(stockData) {
    const dailyData = stockData.bpi;

    const stockDates = Object.keys(dailyData);
    const stockPrices = Object.values(dailyData)


    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: stockDates,
            datasets: [
                {
                    label: "Stock Chart",
                    backgroundColor: "rgb(255, 99, 132, 0.5)",
                    borderColor: "rgb(255, 99, 132)",
                    data: stockPrices
                }
            ]
        }
    }); // closes chart = new Chart()
} // closes printTheChart()
