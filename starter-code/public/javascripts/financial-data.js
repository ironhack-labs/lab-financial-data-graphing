// const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";
let apiUrl;






function printTheChart(stockData) {
    const dailyData = stockData.bpi;
    console.log(dailyData);
    const dates = Object.keys(dailyData);
    const values = Object.values(dailyData);
    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [{
                label: "Stock Chart",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                fill: false,
                data: values
            }]
        }
    });
}

const from = document.querySelector('#from');
const to = document.querySelector('#to');


function selectedDates() {
    let minDate = from.value;
    let maxDate = to.value
    apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${minDate}&end=${maxDate}`
    console.log(apiUrl)
    axios
        .get(apiUrl)
        .then(responseFromAPI => {
            printTheChart(responseFromAPI.data);
        })
        .catch(err => {
            console.log("Error while getting the data: ", err);
        });
}


from.onchange= () => {
    selectedDates()
}
to.onchange= () => {
    selectedDates()
}

window.onload = selectedDates()