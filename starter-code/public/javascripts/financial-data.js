const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`;

axios
  .get(apiUrl)
  .then(responseFromAPI => {
    console.log("The response from API: ", responseFromAPI.data.bpi);
    const chartDates = Object.keys(responseFromAPI.data.bpi);
    const chartCoin = Object.values(responseFromAPI.data.bpi);

  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "line",
   // The data for our dataset
    data: {
      labels: chartDates,
      datasets: [
        {
          label: "BitCoin",
          backgroundColor: "teal",
          borderColor: "lightblue",
          data: chartCoin
        }
      ]
    },

    // Configuration options go here
    options: {}
  });

  }).catch(err => console.log("Error while getting the data: ", err));

  