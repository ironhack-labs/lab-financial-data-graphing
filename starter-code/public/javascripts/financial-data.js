
      
      const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";

      axios
        .get(apiUrl)
        .then(responseFromAPI => {
          console.log(responseFromAPI.data);
          printTheChart(responseFromAPI.data);
        })
        .catch(err => {
          console.log("Error while getting the data: ", err);
        });


        function printTheChart(CoinksData) {
        const dailyData = CoinksData.bpi
        const stockDates = Object.keys(dailyData);
        const stockValues = Object.values(dailyData);

        const ctx = document.getElementById("myChart").getContext("2d");
        const myChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: stockDates,
            datasets: [
              {
                label: "Stock Chart",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                fill: false,
                data: stockValues
              }
            ]
          }
        }); // closes chart = new Chart()
      // closes printTheChart()
        }

     
          