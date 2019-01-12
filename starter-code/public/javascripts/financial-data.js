function updateChart(){
axios.get('http://api.coindesk.com/v1/bpi/historical/close.json', {
    params: {
        start: document.getElementById("start").value,
        end: document.getElementById("end").value,
    }
}
)
    .then(responseFromAPI => {
        console.log('Response from API is: ', responseFromAPI.data);
        const dates = Object.keys(responseFromAPI.data.bpi);
        console.log("dates : " + dates)
        const values = Object.values(responseFromAPI.data.bpi);
        printTheChart(dates, values)
    })
    .catch(err => {
        console.log('Error is: ', err);
    })
}

updateChart()

const startInput = document.getElementById("start");
const endInput = document.getElementById("end");

startInput.onchange = updateChart
endInput.onchange = updateChart

function printTheChart(dates, values) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: "Stock Chart",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: values,
            }]
        }
    });
}



