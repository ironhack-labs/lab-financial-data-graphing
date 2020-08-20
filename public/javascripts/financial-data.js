const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`

axios.get(apiUrl)
.then(responseFromApi => {
    console.log(responseFromApi)
    printTheChart(responseFromApi.data.bpi)
})
.catch(err => console.log(`error while getting the data${err}`))
function printTheChart(stockData) {

  const stockDates = Object.keys(stockData);
  const stockPrices = stockDates.map((date) => stockData[date]);   

  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: stockDates,
        datasets: [{
            label: 'Bitcoin',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: stockPrices,
        }
    ]
  }
}); // closes chart = new Chart()
} // closes printTheChart()


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