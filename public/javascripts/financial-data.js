const input = document.getElementsByTagName('input');
const from = document.getElementById(“from");
const to = document.getElementById(“to");

window.onload = () => {
    getBitocoinData()
}

from.addEventListener('input', event => {
    console.log({event});
    from.value = event.srcElement.value;
    getBitocoinData()
});

to.addEventListener('input', event => {
    console.log({event});
    to.value = event.srcElement.value;
    getBitocoinData()
});

const getBitocoinData = () => {

    const requestApiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";

    if (from || to) {
        apiUrl = requestApiUrl + `?start=${from.value}&end=${to.value}`;
    } else {
        apiUrl = requestApiUrl;
    }

    axios
      .get(apiUrl)
      .then(responseFromAPI => {

            console.log('API response: ', responseFromAPI);
            printTheChart(responseFromAPI.data.bpi);

        })
      .catch(err => console.log('Error updating data: ', err));
}



function printTheChart(stockData) {
    const dailyData = stockData.bpi;

    const stockDates = Object.keys(dailyData);
    const stockPrices = stockDates.map((date) => {
        return dailyData[date];
    });

    const ctx = document.getElementById('myChart').getContext('2d');

    const lineChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: stockDates,
            datasets: [{
                label: "Bitcoin price index",
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                data: stockPrices,
            }, ],
        },
    });
}
