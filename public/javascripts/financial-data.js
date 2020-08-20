const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json`;

axios
  .get(apiUrl)
  .then((responseFromAPI) => {
    //console.log("This is the response from API", responseFromAPI.data); //iteration 1
    printTheChart(responseFromAPI.data);
  })
  .catch((err) => {
    console.log("Error while getting the data: ", err);
  });

function printTheChart(bitcoinData) {
  const dailyData = bitcoinData.bpi; //retrieve single pairs date/price

  const monthDates = Object.keys(dailyData); //retrieve dates from above pairs
  const bitcoinPrices = monthDates.map((date) => dailyData[date]); //retrieve prices from above pairs

  // data visualization in canvas
  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",

    data: {
      labels: monthDates, //labels on the x axis in my chart
      datasets: [
        {
          label: "Bitcoin Price Index Chart",
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
          data: bitcoinPrices, //labels on the y axis in my chart
        },
      ],
    },
  });
}

// changes data in chart if dates are updated
const input = document.getElementsByTagName("input");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");

startDate.addEventListener("input", (event) => {
  startDate.value = event.srcElement.value; //input event is actioned when there is a change in the value
  getDataFromAPI();
});

endDate.addEventListener("input", (event) => {
  endDate.value = event.srcElement.value; //input event is actioned when there is a change in the value
  getDataFromAPI();
});

getDataFromAPI = () => {
  if (startDate.value && endDate.value) {
    axios
      .get(`${apiUrl}?start=${startDate.value}&end=${endDate.value}`)
      .then((responseFromAPI) => {
        printTheChart(responseFromAPI.data);
      })
      .catch((err) => {
        console.log(`Error returning filtered data: ${err}`);
      });
  } else {
    alert("Select from and to date");
  }
};
