window.addEventListener('load', (event) => {
  let restCoinDeskApi = axios.create({
    baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
  });
  restCoinDeskApi
  .get()
  .then(responseFromAPI => {
    console.log("Response from API is: ", responseFromAPI.data)
    printTheChart(responseFromAPI.data)
  })
  .catch(err => console.log("Error is: ", err));
});


document.getElementById("dateFinish").addEventListener('change', (event) => {

  let dateFrom = document.getElementsByName("dateBegin")[0].value
  let dateTo = document.getElementsByName("dateFinish")[0].value

  if ((dateFrom == !null) && (dateTo == !null)) {
    let restCoinDeskApi = axios.create({
      baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
    });
    restCoinDeskApi
    .get()
    .then(responseFromAPI => {
      console.log("Response from API is: ", responseFromAPI.data)
      printTheChart(responseFromAPI.data)
    })
    .catch(err => console.log("Error is: ", err));
  } else {
    let restCoinDeskApi = axios.create({
      baseURL: `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`
    });
    restCoinDeskApi
      .get()
      .then(responseFromAPI => {
        console.log("Response from API is: ", responseFromAPI.data)
        printTheChart(responseFromAPI.data)
      })
      .catch(err => console.log("Error is: ", err));    
  }
})

document.getElementById("dateBegin").addEventListener('change', (event) => {

  let dateFrom = document.getElementsByName("dateBegin")[0].value
  let dateTo = document.getElementsByName("dateFinish")[0].value

  if ((dateFrom == !null) && (dateTo == !null)) {
    let restCoinDeskApi = axios.create({
      baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
    });
    restCoinDeskApi
    .get()
    .then(responseFromAPI => {
      console.log("Response from API is: ", responseFromAPI.data)
      printTheChart(responseFromAPI.data)
    })
    .catch(err => console.log("Error is: ", err));
  } else {
    let restCoinDeskApi = axios.create({
      baseURL: `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`
    });
    restCoinDeskApi
      .get()
      .then(responseFromAPI => {
        console.log("Response from API is: ", responseFromAPI.data)
        printTheChart(responseFromAPI.data)
      })
      .catch(err => console.log("Error is: ", err));    
  }
})

function printTheChart(stockData) {
  const dailyData = stockData["bpi"];
  console.log("dailyData", dailyData);
  
  const stockDates = Object.keys(dailyData);
  console.log("stockDates", stockDates);
  
  const stockPrices = Object.values(dailyData);
  console.log(stockPrices);
  
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
          data: stockPrices
        }
      ]
    }
  }); // closes chart = new Chart()
}

