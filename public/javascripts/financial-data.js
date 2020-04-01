const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";
axios
    .get(apiUrl)
    .then(responseFromAPI => {
        printData(responseFromAPI.data.bpi)
    })
    .catch(err => {
        console.log("Error while getting data: ", err)
    });


document.querySelector('#start-btn').onclick = () => {
    const endDate = document.querySelector("#final-date").value;
    const startDate = document.querySelector("#initial-date").value;
    const currency = document.querySelector("#currency-select").value;
    axios
        .get(apiUrl + `?start=` + startDate + `&end=` + endDate + `&currency=${currency}`)
        .then(responseFromAPI => {
            printData(responseFromAPI.data.bpi)
        })
        .catch(err => console.log("Error", err))
}

const printData = data => {
    document.querySelector(".info").innerHTML = ''
    const stockDates = Object.keys(data);
    const stockPrices = stockDates.map(date => data[date]);
    const ctx = document.getElementById('myChart').getContext('2d');
    const min = Math.min(...stockPrices)
    const max = Math.max(...stockPrices)
    const createMax = document.createElement('h4');
    const createMin = document.createElement('h4');
    createMax.innerHTML = `Max value = ${max}`;
    createMin.innerHTML = `Min value = ${min}`;
    document.querySelector(".info").appendChild(createMax);
    document.querySelector(".info").appendChild(createMin);
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: stockDates,
            datasets: [{
                label: 'Bitcoin Chart',
                data: stockPrices,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor:'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        }
    });
}