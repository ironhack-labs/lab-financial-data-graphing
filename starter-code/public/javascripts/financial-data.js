
document.getElementById("button").onclick = () => {
    getData()
}
function getData() {
    const startDate = document.getElementById('startDate').value
    const endDate = document.getElementById('endDate').value
    const currency = document.getElementById('currency').value

    const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`;

    axios
        .get(apiUrl)
        .then(responseFromAPI => printTheChart(responseFromAPI.data))
        .catch(err => console.log("Error while getting the data: ", err))


    function printTheChart(stockData) {

        console.log(stockData)

        const dailyData = stockData["bpi"];

        const stockDates = Object.keys(dailyData);

        const stockPrices = Object.values(dailyData)


        const ctx = document.getElementById("myChart").getContext("2d");
        new Chart(ctx, {
            type: "line",
            data: {
                labels: stockDates,
                datasets: [
                    {
                        label: "Stock Chart",
                        backgroundColor: "rgb(255, 99, 132)",
                        borderColor: "rgb(255, 99, 132)",
                        data: stockPrices
                    }
                ]
            }
        })
    }
}
