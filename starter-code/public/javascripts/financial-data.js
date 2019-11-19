const currencyDomEl = document.getElementById("currency");
const dateFromDomEl = document.querySelector("#dateFrom");
const dateToDomEl = document.querySelector("#dateTo");


function chartMaster(){

const dateFrom = dateFromDomEl.value;
const dateTo = dateToDomEl.value;
const currency = currencyDomEl.value;

const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`

function getDataAndPrint(apiUrl,currency){
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
            label: "Value",
            backgroundColor: "rgb(247,0,255)",
            borderColor: "rgb(247,0,255)",
            fill: false,
            data: stockPrices
          }
        ]
      }
    }); 
  } 

getDataAndPrint(apiUrl,currency)

}


currencyDomEl.addEventListener("change", chartMaster)

dateFromDomEl.addEventListener("change", chartMaster)

dateToDomEl.addEventListener("change", chartMaster)

chartMaster()