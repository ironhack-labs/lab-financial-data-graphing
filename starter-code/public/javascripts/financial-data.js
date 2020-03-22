let $update = document.getElementById('update-chart');

axios
    .get("http://api.coindesk.com/v1/bpi/historical/close.json")
    .then((apiResponse) => {
        let financialData = apiResponse.data
        showChart(financialData)
    })
    .catch((error) => {
        console.log(error)
    })

$update.onclick = function(){
    let $startDate = document.getElementById("start-date").value;
    let $endDate = document.getElementById("end-date").value;
    let $currency = document.getElementById("currency").value;
    const updatedData = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${$startDate}&end=${$endDate}&currency=${$currency}`
    axios
        .get(updatedData)
        .then((apiResponse)=> {
            showChart(apiResponse.data);
        })
        .catch((error) => {
            console.log(error)
        })
}

function showChart(financialData) {
    let data = financialData["bpi"];
    let stockData = Object.keys(data);
    let stockPrices = Object.values(data);

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: stockData,
            datasets: [{
                label: 'Bitcoin Price Index',
                data: stockPrices,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

