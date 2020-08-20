const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json`;

axios
  .get(apiUrl)
  .then((responseFromAPI) => {
    //console.log("This is the response from API", responseFromAPI.data); //ITERATION 1
    printTheChart(responseFromAPI.data);
  })
  .catch((err) => {
    console.log("Error while getting the data: ", err);
  });

//print chart on canvas
const printTheChart = (bitcoinData) => {
  const dailyData = bitcoinData.bpi; //retrieve single pairs date/price

  const monthDates = Object.keys(dailyData); //retrieve dates from above pairs
  const bitcoinPrices = monthDates.map((date) => dailyData[date]); //retrieve prices from above pairs

  // data visualization in canvas
  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",

    data: {
      labels: monthDates, //labels on the x axis
      datasets: [
        {
          label: "Bitcoin Price Index Chart",
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
          data: bitcoinPrices, //labels on the y axis
        },
      ],
    },
  });
};

// ITERATION 3: dates filter: changes data in chart if dates are updated
const input = document.getElementsByTagName("input");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");

startDate.addEventListener("input", (event) => {
  startDate.value = event.srcElement.value; //input event is actioned when there is a change in the value
  getSelectedDates();
});

endDate.addEventListener("input", (event) => {
  endDate.value = event.srcElement.value; //input event is actioned when there is a change in the value
  getSelectedDates();
});

getSelectedDates = () => {
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

//ITERATION 4 - BONUS: Show data for different currencies
const pickCurrency = () => {
  const currency = document.getElementById("currency").value;

  axios
    .get(`${apiUrl}?currency=${currency}`)
    .then((responseFromAPI) => {
      //console.log(responseFromAPI.data);
      if (startDate.value && endDate.value) getSelectedDates(); // consider filter dates
      printTheChart(responseFromAPI.data);
    })
    .catch((err) =>
      console.log("Error retrieving the selected currency: ", err)
    );
};
