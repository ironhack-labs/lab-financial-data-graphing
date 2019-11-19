let from = ""
let to = ""
let curr = ""
const bitCoinApi = axios.create({
    baseURL: `http://api.coindesk.com/v1/bpi/historical/`
});

function getBitCoinInfo() {
    from = document.getElementById("theInput1").value
    to = document.getElementById("theInput2").value
    curr = document.getElementById("theInput3").value

    if (!from)
        from= "2019-11-01"
    if (!to) 
        to = "2019-11-10"

   bitCoinApi
        .get(`close.json?start=${from}&end=${to}&currency=${curr}`)
        .then(responseFromAPI => {
            printTheChart(responseFromAPI.data)
            let a = responseFromAPI.data.bpi
           let arr = Object.values(a)
            document.getElementById("min").innerText = Math.min(...arr)
            document.getElementById("max").innerText = Math.max(...arr)
            
        })
        .catch(err => {
            console.log("Error is: ", err);
        });
}
document.getElementById("theInput1").onchange = function () {
    getBitCoinInfo()
}
document.getElementById("theInput2").onchange = function () {
    getBitCoinInfo()
}
document.getElementById("theInput3").onchange = function () {
    getBitCoinInfo()
}

function printTheChart(getBitCoinInfo) {
    const dailyData = getBitCoinInfo["bpi"];

    const stockDates = Object.keys(dailyData);
    const stockPrices = stockDates.map(date => {
        return dailyData[date];
    });

    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: stockDates,
            datasets: [{
                label: "Stock Chart",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: stockPrices
            }]
        }
    }); // closes chart = new Chart()
} // closes printTheChart()