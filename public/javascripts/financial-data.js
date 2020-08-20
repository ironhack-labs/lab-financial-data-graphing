const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json`


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
  const maxValue = document.getElementById("maxValue");
  const minValue = document.getElementById("minValue");
  
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
maxValue.innerHTML = `Max: ${Math.max(...stockPrices)}`;
minValue.innerHTML = `Min: ${Math.min(...stockPrices)}`;
} // closes printTheChart()


//Filter

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

  // Currency

  document.getElementById("btn-currency").addEventListener("change", () => {
    const Currency = document.getElementById("btn-currency").value;
    axios
    .get(`${apiUrl}?currency=${Currency}`)
    .then((response) => {
                printTheChart(response.data);
            })
            .catch((err) => {
                console.log(`Error returning filtered data: ${err}`)
            })
    });

