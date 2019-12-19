let inputs = document.getElementsByTagName("input");

for(let i = 0; i < inputs.length; i++) {
  inputs[i].onchange = onInputChangeHandler;
}

function onInputChangeHandler() {
  let start = document.getElementById("startFrom").value
  let end = document.getElementById("startTo").value  

  const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`;

  axios
    .get(apiUrl)
    .then(responseFromAPI => {
      printTheChart(responseFromAPI.data);
      console.log("The response from API: ", responseFromAPI);
    })
    .catch(err => {
      console.log("Error while getting the data: ", err);
    });

    function printTheChart(stockData) {
      const dailyData = stockData["bpi"];
    
      const stockDates = Object.keys(dailyData);
      const stockPrices = stockDates.map(date => {
        return dailyData[date];
      });
    
      const ctx = document.getElementById("myChart").getContext("2d");
      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: stockDates,
          datasets: [
            {
              label: "Bitcoin Chart",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: stockPrices
            }
          ]
        }
      }); // closes chart = new Chart()
    }  
  }

onInputChangeHandler();