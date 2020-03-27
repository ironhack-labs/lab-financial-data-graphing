let fromDate 
let toDate 
let currency
let dataArray
let max
let min
let apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json';

// axios
//   .get(apiUrl)
//   .then(responseFromAPI => console.log("The response from API: ", responseFromAPI))
//   .catch(err => console.log("Error while getting the data: ", err));

//API call
const apiCall = function apiCall() {
    axios
        .get(apiUrl)
        .then(responseFromAPI => {
            dataArray = Object.values(responseFromAPI.data.bpi);
            printTheChart(responseFromAPI.data); 
            updateMaxMinAfterApiCall();
        })
        .catch(err => console.log("Error while getting the data: ", err));
} 

apiCall()

//Function to build the graph
function printTheChart(bitcoinData) {
  const dailyData = bitcoinData["bpi"];

  const bitcoinDates = Object.keys(dailyData);
  const bitcoinPrices = bitcoinDates.map( date => dailyData[date]);

  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: bitcoinDates,
      datasets: [
        {
          label: "Bitcoin Chart",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: bitcoinPrices
        }
      ]
    }
  }); 
} 

//Event listeners
document.getElementById('fromDate').addEventListener('input', (event) => {
    fromDate = event.target.value
    toDate = document.getElementById('toDate').value
    apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`
    apiCall()
    updateMaxMinAfterApiCall()
} )

document.getElementById('toDate').addEventListener('input', (event) => {
    toDate = event.target.value
    fromDate = document.getElementById('fromDate').value
    apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`
    apiCall()
    updateMaxMinAfterApiCall()
} )

document.getElementById('currency').addEventListener('change', (event) => {
    currency = event.target.value
    if (toDate == undefined || fromDate == undefined) {
        apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`
    } else {
        apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`
    }
    apiCall()
    updateMaxMinAfterApiCall()
} )

//Max & Min Values
function updateMaxMin(...array) {
    max = Math.max(...array)
    min = Math.min(...array)
    document.getElementById('myMax').innerText = `Max: ${max}`
    document.getElementById('myMin').innerText = `Min: ${min}`
}

function updateMaxMinAfterApiCall() {
    setTimeout(() => {  updateMaxMin(...dataArray) }, 500);
}