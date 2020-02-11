let start = document.querySelector('#start').value;
let end = document.querySelector('#end').value;
let currency = document.querySelector('#currency').value;
let apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`;
                                                                    


document.querySelector('#start').onchange = function () {
    drawAll()
}

document.querySelector('#end').onchange = function () {
    drawAll()
}

document.querySelector('#currency').onchange = function () {
    drawAll()
}

window.onload(drawAll())
// window.onload(drawCurrency())

function drawAll() {
    start = document.querySelector('#start').value;
    end = document.querySelector('#end').value;
    currency = document.querySelector('#currency').value;
    apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`


    axios
        .get(apiUrl)
        .then(response => {
            printTheChart(response.data);
        })
}

function printTheChart(stockData) {
    // console.log(stockData)
    const dailyData = stockData["bpi"];
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
                label: "Negociación en bolsa",
                backgroundColor: "rgb(100, 100, 100)",
                borderColor: "rgb(255, 0, 0)",
                data: stockPrices
            }]
        }
    }); // closes chart = new Chart();
} // closes printTheChart();