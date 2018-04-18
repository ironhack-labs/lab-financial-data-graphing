

// const ticker = "time.updated";

let startDate = "2018-03-18";
let endDate = "2018-04-18";
let currency = "USD";
let api_url = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`;

$(document).ready(() => {
    $("#date1").change(function () {
        startDate = $("#date1").val();
        api_url = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`;
        axios
            .get(api_url)
            .then(res => res.data)
            .then(data => drawChart(data))
    })
    $("#date2").change(function () {
        endDate = $("#date2").val();
        api_url = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`;
        console.log(api_url)
        axios
            .get(api_url)
            .then(res => res.data)
            .then(data => drawChart(data))
    })

    $("#currency").change(function () {
        currency = $("#currency").val();
        api_url = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`;
        axios
            .get(api_url)
            .then(res => res.data)
            .then(data => drawChart(data))
    })



})


axios
            .get(api_url)
            .then(res => res.data)
            .then(data => drawChart(data))


const drawChart = data => {
    let stockLabels = Object.keys(data.bpi);
    let stockPrice = Object.values(data.bpi);

    $("#max-value").text("Max: " + Math.max.apply(Math, stockPrice) + " " + currency)
    $("#min-value").text("Min: " + Math.min.apply(Math, stockPrice) + " " + currency)

    let ctx = document.getElementById("myChart").getContext("2d");
    let chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: stockLabels,
            datasets: [
                {
                    label: "Bitcoin Price Index",
                    // backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: stockPrice
                }
            ]
        }
    });
};