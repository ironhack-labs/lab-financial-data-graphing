// Filter by dates
// ?start=<VALUE>&end=<VALUE> (YYY-MM-DD)

// Change the currency
// ?currency=<VALUE>
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const currency =  document.getElementById('currency');

const arrayofInput = [startDate, endDate, currency]

/*
axios
.get("http://api.coindesk.com/v1/bpi/historical/close.json")
.then(response => {
    printTheChart(response.data.bpi)
})
*/

arrayofInput.addEventListener('input', [startDate, endDate, currency] => {
   
    axios
    .get(`http://api.coindesk.com/v1/bpi/historical/close.json/?start=${startDate.value}&end=${endDate.value}?currency=${currency.value}`)
    
    .then(response => {
        console.log(response.data)
    printTheChart(response.data.bpi)
    })
});

function printTheChart(stockData) {
    const date = Object.keys(stockData)
    const price = Object.values(stockData)
  
    const ctx = document.getElementById('my-chart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: date,
        datasets: [
          {
            label: 'BitCoin Price Index',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: price
          }
        ]
      }
    }); // closes chart = new Chart()
  } // closes printTheChart()*/