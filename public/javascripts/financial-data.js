console.log("JavaScript connected")

function getData() {
    const currency = document.getElementById("currency").value;
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;

    axios.get(
            "http://api.coindesk.com/v1/bpi/historical/close.json?currency=" + currency + "&start=" + startDate + "&end=" + endDate
        )
        .then(respuesta => printTheChart(respuesta.data, currency, startDate, endDate))
        .catch(err => console.log(err))

}

function printTheChart(btcData, currency, startDate, endDate) {
    console.log(btcData)
    const btcDates = Object.keys(btcData.bpi);
    const btcPrices = Object.values(btcData.bpi);

    document.getElementById("max-value").innerHTML = Math.max(...btcPrices).toFixed(2) + " " + currency;
    document.getElementById("min-value").innerHTML = Math.min(...btcPrices).toFixed(2) + " " + currency;

    const ctx = document.getElementById("chart").getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: btcDates,
            datasets: [{
                label: 'Bitcoin Values (' + currency + ")",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: btcPrices
            }]
        }
    }); // closes chart = new Chart()
} // closes printTheChart()