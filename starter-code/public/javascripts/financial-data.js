// This is the front-end javascript, which is always located in "PUBLIC" folder.


// const restFinancialInfoApi = axios.create({
//     baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
//   });
  
    let startDate = 0;
    let endDate = 0;

  function getFinancialInfo(start,end) {
    // restFinancialInfoApi
    //   .get(theName)
    //   .then(responseFromAPI => {
    //     console.log("Response from API is: ", responseFromAPI.data.bpi);
    //   })
    //   .catch(err => {
    //     console.log("Error is: ", err);
    //   });
    if (startDate && endDate){
        axios
        .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
        .then(responseFromAPI => {
            console.log(responseFromAPI.data.bpi);
            printTheChart(responseFromAPI.data.bpi); // <== call the function here where you used to console.log() the response
          })
          .catch(err => {
            console.log("Error while getting the data: ", err);
          });  
    } else {
        axios
        .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
        .then(responseFromAPI => {
            console.log(responseFromAPI.data.bpi);
            printTheChart(responseFromAPI.data.bpi); // <== call the function here where you used to console.log() the response
          })
          .catch(err => {
            console.log("Error while getting the data: ", err);
          });
      }

  }
  
  document.getElementById("theButton").onclick = function() {
    startDate = document.getElementById("theStartDate").value;
    endDate = document.getElementById("theEndDate").value;
    getFinancialInfo(startDate,endDate);
  };
  

// PRINT THE CHART function

  //.get API URL
    axios
    .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    .then(responseFromAPI => {
        console.log(responseFromAPI.data.bpi);
        printTheChart(responseFromAPI.data.bpi); // <== call the function here where you used to console.log() the response
      })
      .catch(err => {
        console.log("Error while getting the data: ", err);
      });


function printTheChart(stockData) {
//   const dailyData = stockData["Time Series (Daily)"];
    console.log(stockData);
  const stockDates = Object.keys(stockData);
  const stockPrices = Object.values(stockData);
  console.log(stockDates);
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
} // closes printTheChart()



//   console.log(restFinancialInfoApi);