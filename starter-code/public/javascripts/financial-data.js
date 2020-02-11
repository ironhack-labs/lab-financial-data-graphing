let chartInitialized = false;
let apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";

function getData(fromDate, toDate, currencySelected = "USD") {

  if (fromDate != undefined && toDate != undefined) {
    apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json" + `?start=${fromDate}&end=${toDate}&currency=${currencySelected}` ;

  }

  axios
    .get(apiUrl)
    .then(responseFromAPI => {
    printTheChart(responseFromAPI.data.bpi); // <== call the function here where you used to console.log() the response
})
.catch(err => {
    console.log("Error while getting the data: ", err);
});
}
getData();

let ctx, chart;

function printTheChart(bitcoinData) {
    const dates = Object.keys(bitcoinData);
    const bitcoinPrices = dates.map(date => {
        return bitcoinData[date];
        
    });

    let maximum = Math.max(...bitcoinPrices);
    let minimum = Math.min(...bitcoinPrices);
    document.querySelector("#maxvalue").innerHTML = maximum;
    document.querySelector("#minvalue").innerHTML = minimum;  
    
    if (chartInitialized) {
        chart.data.labels = dates
        chart.data.datasets[0].data = bitcoinPrices

    chart.update();
  } else {
    chartInitialized = true;

    ctx = document.getElementById("myChart").getContext("2d");
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Bitcoin Prices",
            backgroundColor: "rgb(233,234,233)",
            borderColor: "rgb(0, 0, 0)",
            data: bitcoinPrices
          }
        ]
      }
    });
  }
}

//Events
let fromDateInput = document.querySelector("#fromDate");
let toDateInput = document.querySelector("#toDate");
let currency = document.querySelector("#change-currency");

fromDateInput.onchange = filterChange;
toDateInput.onchange = filterChange;
currency.onchange = filterChange;

function filterChange(){
    getData(fromDateInput.value, toDateInput.value, currency.value);
}

