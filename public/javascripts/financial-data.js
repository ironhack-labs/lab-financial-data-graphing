const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json"

const printTheChart = stockData => {
    const stockDates = Object.keys(stockData.bpi);
    const stockPrices = stockDates.map(date => {
        return stockData.bpi[date];
    });
    const ctx = document.getElementById("myChart").getContext("2d")
    new Chart(ctx, {
        type: "line",
        data: {
            labels: stockDates,
            datasets: [{
                labels: "Stock Chart",
                data: stockPrices
            }]
        }
    })
}

axios.get(apiUrl)
.then(response => {
    printTheChart(response.data);
})

 const getDates = (date1, date2) => {
    axios.get(apiUrl + `?start=${date1}&end=${date2}`)
    .then(response => {
        printTheChart(response.data)
    }).catch(err => console.log(err))
}

const getCurrency = (currency) => {
    axios.get(apiUrl + `&currency=${currency}`)
}

document.querySelector("select").addEventListener('change', (event) => { 
    const dollar = document.getElementById("dollar").value
    const euro = document.getElementById("euro").value
    console.log(event.target.value);
    getCurrency(event.target.value)
})

document.querySelectorAll("input").forEach(input => {
input.addEventListener('change', () => {
    const userInput1 = document.getElementById("from").value;
    const userInput2 = document.getElementById("to").value;    
    // console.log(userInput1, userInput2);
    getDates(userInput1, userInput2)
})
});
