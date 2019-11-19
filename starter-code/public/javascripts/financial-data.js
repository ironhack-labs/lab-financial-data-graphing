//Const
const dateFromDomEl = document.querySelector("#dateFrom");
const dateToDomEl = document.querySelector("#dateTo");

const dateFrom = dateFromDomEl.value;
const dateTo = dateToDomEl.value;

const currencyDomEl = document.getElementById("currency");
const currency = currencyDomEl.value;

const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`


currencyDomEl.addEventListener("change", function(){
    const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`
    const currency = currencyDomEl.value;
    getDataAndPrint(apiUrl,currency)
})

dateFromDomEl.addEventListener("change", function(){
  
    const currency = currencyDomEl.value;
    const dateFrom = dateFromDomEl.value;
    const dateTo = dateToDomEl.value;
   
    const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`
   

    getDataAndPrint(apiUrl,currency)
})

dateToDomEl.addEventListener("change", function(){
   
    const currency = currencyDomEl.value;
    const dateFrom = dateFromDomEl.value;
    const dateTo = dateToDomEl.value;
   
    const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`
   

    getDataAndPrint(apiUrl,currency)
})




// document.addEventListener()
console.log(apiUrl)
//Axios
function getDataAndPrint(apiUrl,currency){
    console.log(currency)
    axios
    .get(apiUrl)
    .then(responseFromAPI => {
        console.log(responseFromAPI.data);
      printTheChart(responseFromAPI.data, currency);
    })
    .catch(err => {
      console.log("Error while getting the data: ", err);
    });
}



// Charts

function printTheChart(data, currency) {
    
    const dailyData = data["bpi"];
    const stockDates = Object.keys(dailyData);
    const stockPrices = stockDates.map(date => {
      return (dailyData[date]*(+currency));
    });
    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: stockDates,
        datasets: [
          {
            label: "Stock Chart",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            fill: false,
            data: stockPrices
          }
        ]
      }
    }); // closes chart = new Chart()
  } // closes printTheChart()


getDataAndPrint(apiUrl,currency)
// chart.update();