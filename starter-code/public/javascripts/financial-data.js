function startAxios(apiUrl) {
    axios
        .get(apiUrl)
        .then(responseFromAPI => {
            console.log(responseFromAPI.data)
            printTheChart(responseFromAPI.data)
        })
        .catch(err => console.log("Error while getting the data: ", err))
}


function printTheChart(currencyData) {

    console.log(currencyData)

    const periodicData = currencyData["bpi"];

    const currencyDates = Object.keys(periodicData);
    const currencyPrices = currencyDates.map(date => periodicData[date]);


    const maxValue = Math.max(...currencyPrices)
    const minValue= Math.min(...currencyPrices)
    console.log(maxValue, minValue)

    document.getElementById("maxValue").innerText = maxValue;
    document.getElementById("minValue").innerText = minValue;

    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: currencyDates,
            datasets: [{
                label: "Bitcoin Price Chart",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: currencyPrices
            }]
        }
    })
}

document.getElementById("theButton").onclick = () => {
    // alert('yay')
    const startDate = document.getElementById("fromInput").value;
    const endDate = document.getElementById("toInput").value;
    const currency = document.getElementById("currency").value;
    const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`
    startAxios(apiUrl)
    printTheChart(currencyData)
}