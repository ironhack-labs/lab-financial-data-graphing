const key = "demo";
const functionName = "TIME_SERIES_DAILY";
const symbolName = "MSFT";
// const apiUrl = `https://www.alphavantage.co/query?function=${functionName}&symbol=${symbolName}&apikey=${key}`;


const minMax = (elem, value) => {
    console.log(`entrando`, value)
    switch (elem) {
    case 'min':
        const mathMin = Math.min(...value);
        console.log(mathMin)
        return mathMin
        break;
    case 'max':
        return Math.max(...value);
        break;
} 
}

const print = (inputStart, inputEnd, currency) => {
let apiPrint = ""
const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json"
const apiSearch = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${inputStart}&end=${inputEnd}&currency=${currency}`
// if(inputStart !== '' && inputEnd !== '') {
//     apiPrint = apiSearch
// } else {
//     apiPrint = apiUrl
// }

axios
  .get(apiSearch)
  .then(responseFromAPI => {
    // console.log("The response from API: ", responseFromAPI.data);
    printTheChart(responseFromAPI.data.bpi);
  })
  .catch(err => {
    console.log("Error while getting the data: ", err);
  });
}



  function printTheChart(stockData) {
    // const dailyData = stockData["Time Series (Daily)"];
  
    const stockDates = Object.keys(stockData);
    const stockPrices = stockDates.map(date => {
      return stockData[date];
    });

  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockDates,
      datasets: [
        {
          label: 'Bitcoin Price',
          backgroundColor: "rgba(202, 202, 202, 0.315)",
          borderColor: "rgb(202, 202, 202)",
          data: stockPrices
        }
      ]
    }
  })
//   let spred = [...stockPrices]
  document.getElementById('min-value').innerHTML = minMax('min', stockPrices);
  document.getElementById('max-value').innerHTML = minMax('max', stockPrices);  
}


document.addEventListener("change", () => {
const inputStart = document.getElementById('start')
const inputEnd = document.getElementById('end')
const currency = document.getElementById('currency')
// const min = document.getElementById('min-value')
// const max = document.getElementById('max-value')

print(inputStart.value, inputEnd.value, currency.value)

})

