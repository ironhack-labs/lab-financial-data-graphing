function getAllCurrency(){
    axios.get('https://api.coindesk.com/v1/bpi/supported-currencies.json')
}


function getBitcoinData(fromDate, toDate, currency) {
    axios.get('http://api.coindesk.com/v1/bpi/historical/close.json', {
        params: {
            start : fromDate,
            end : toDate,
            currency : currency
        }
    })
        .then(response => {
            console.log(response)
            printTheChart(response.data.bpi);
        })
        .catch(error => {
        console.log(error)
    })

}

let fromDateElem = document.getElementById("from")
let toDateElem = document.getElementById("to")
let currencyElem = document.getElementById("currency")

fromDateElem.addEventListener("change", function(){
    getBitcoinData(fromDateElem.value, toDateElem.value, currencyElem.value)
});
toDateElem.addEventListener("change", function(){
    getBitcoinData(fromDateElem.value, toDateElem.value, currencyElem.value)
});

currencyElem.addEventListener("change", function(){
    getBitcoinData(fromDateElem.value, toDateElem.value, currencyElem.value)
});



const printTheChart = (bpiData => {
  const bpiPrices = Object.values(bpiData);
  const bpiDates = Object.keys(bpiData);

  // Price Max and Min
  const priceMax = Math.max.apply(null, bpiPrices)
  const priceMin = Math.min.apply(null, bpiPrices)
  //
    const pMax= document.getElementById("Max")
    const pMin= document.getElementById("Min")
    pMax.innerHTML = priceMax
    pMin.innerHTML = priceMin
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: bpiDates,
      datasets: [{
        label: "Bitcoin Price Index",
        backgroundColor: 'rgb(0, 99, 132)',
        borderColor: 'rgb(100, 99, 132)',
        data: bpiPrices,
      }]
    }
  });
});