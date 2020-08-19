
const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`

axios.get(apiUrl)
.then(responseFromApi => {
    console.log(responseFromApi)
    printTheChart(responseFromApi.data.bpi)
})
.catch(err => console.log(`error while getting the data${err}`))

function printTheChart(coinDeskData) {
    console.log(coinDeskData)

    const coinDeskDates = Object.keys(coinDeskData)
    const coinDeskPrices = coinDeskDates.map((date) => coinDeskData[date]);

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: coinDeskDates,
        datasets: [{
            label: 'CoinDesk Bitcoin Price Index',
            backgroundColor: 'rgb(194, 34, 68 )',
            borderColor: 'rgb(146, 17, 45)',
            data: coinDeskPrices
        }]
    },

    // Configuration options go here
    options: {}
});
}

//it3

document.getElementById("btn-update").onclick = () => {
    const startDate = document.getElementById('date-start').value;
    const endDate = document.getElementById('date-end').value;
    
    if (startDate && endDate) {
        axios
            .get(`${apiUrl}?start=${startDate}&end=${endDate}`)
            .then((response) => {
                printTheChart(response.data.bpi);
            })
            .catch((err) => {
                console.log(`Error returning filtered dates: ${err}`)
            })
    }
  }