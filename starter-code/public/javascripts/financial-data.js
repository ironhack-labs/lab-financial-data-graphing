const restCoinDeskApi = axios.create({
    baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
  });
  
  function getCoinDeskInfo() {
    restCoinDeskApi
      .get()
      .then(responseFromAPI => printTheChart(responseFromAPI.data))
      .catch(err => console.log("Error is: ", err));
  }
  
  

// Print function
  function printTheChart(data) {
    const bpi = data["bpi"];
  
    const axisX = Object.keys(bpi);
    const axisY = axisX.map(e => bpi[e]);
  
    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: axisX,
        datasets: [
          {
            label: "Data",
            backgroundColor: "#FF0000",
            borderColor: "rgb(255, 99, 132)",
            data: axisY
          }
        ]
      }
    }); // closes chart = new Chart()
  } // closes printTheChart()

  document.getElementById("theButton").onclick = function() {
    // const country = document.getElementById("theInput").value;
    getCoinDeskInfo();
  };