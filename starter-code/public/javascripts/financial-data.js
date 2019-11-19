// const key = "demo";
// const functionName = "TIME_SERIES_DAILY";
// const symbolName = "MSFT";
const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";

axios
    .get(apiUrl)
    .then(responseFromAPI => {
        console.log(responseFromAPI.data);
        // res.json('index', responseFromAPI.data)
        printTheChart(responseFromAPI.data);
    })
    .catch(err => {
        console.log("Error while getting the data: ", err);
    });

    function printTheChart(stockData) {
        const dailyData = stockData.bpi;
        console.log(dailyData);
        const dates = Object.keys(dailyData);
        // console.log(x);
        const values = Object.values(dailyData);
        // console.log(y);
        const ctx = document.getElementById("myChart").getContext("2d");
        const chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: dates,
            datasets: [
              {
                label: "Stock Chart",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                fill: false,
                data: values
              }
            ]
          }
        }); 
      } 
