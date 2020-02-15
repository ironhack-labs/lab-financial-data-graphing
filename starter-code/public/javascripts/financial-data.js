const coinDeskApi = axios.create({
    baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
  });
  
  function getCoinDeskInfo() {
    coinDeskApi
      .get()
      .then(responseFromAPI => {
        console.log("Response from API is: ", responseFromAPI);
        printTheChart(responseFromAPI.data);
      })
      .catch(err => console.log("Error is: ", err));
  }
  
  document.getElementById("theInput").onchange = function() {
    getCoinDeskInfo();
  };

function printTheChart(stockData) {
    const dailyData = stockData["bpi"];
  
    const stockDates = Object.keys(dailyData);
    const stockPrices = stockDates.map(date => dailyData[date]);
  
    const ctx = document.getElementById("myChart").getContext("2d");
  
    new Chart(ctx, {
      type: "line",
      data: {
        labels: stockDates,
        datasets: [
          {
            label: "Bitcoin prices",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: stockPrices
          }
        ]
      }
    }); 
  } 