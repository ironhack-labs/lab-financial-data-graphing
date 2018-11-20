

function makeCurrencyAJAXRequest() {
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    .then((currencyData) => {
      //we are instantiating a CurrencyData object, so we can have the information in one place
      printTheChart(currencyData.data.bpi)
    })
    .catch((err) => { console.log(err) });
}


const printTheChart = (stockData => {
  const days = Object.keys(stockData);
  const values = Object.values(stockData);
  console.log(days);
  console.log(values);
  const ctx = document.getElementById("myChart").getContext('2d');
  //here we give the chart the data it needs
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: days,
      datasets: [{
        label: "Values Chart",
        backgroundColor: 'rgb(255, 99, 132)',
        fill: false,
        tension: 0,
        pointHoverRadius: 20,
        borderColor: 'rgb(255, 99, 132)',
        data: values,
      }]
    }
  });
});





makeCurrencyAJAXRequest();
// printTheChart(currencyData.data.bpi);