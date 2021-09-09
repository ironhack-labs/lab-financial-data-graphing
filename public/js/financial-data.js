// const { default: axios } = require("axios");
window.onload = () => {
  const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";
  let newChart;
  const printChart = (dataFromApi) => {
    const dailyData = dataFromApi["bpi"];
    //console.log(dailyData);
    // data for x axis
    const dates = Object.keys(dailyData);
    //console.log(dates);
    // data for y-axis
    const bitcoinValue = dates.map((dailyValue) => {
      return dailyData[dailyValue];
    });
    // console.log(bitcoinValue);
    const ctx = document.querySelector("#myChart").getContext("2d");

    newChart = new Chart(ctx, {
      type: "line",
      data: {
        // x-axis
        labels: dates,
        datasets: [
          {
            label: "Bitcoin Price Index",
            backgroundColor: "rgb(192, 192, 192, 0.5)",
            pointBackgroundColor: "rgb(192, 192, 192, 0.5)",
            pointBorderColor: "rgb(192, 192, 192)",
            fill: {
              target: "origin",
              above: "rgb(192, 192, 192, 0.4)",
            },
            // y-axis
            data: bitcoinValue,
          },
        ],
      },
    });
  };

  axios
    .get(apiUrl)
    .then((response) => {
      console.log(response.data);
      printChart(response.data);
    })
    .catch((err) => {
      console.log(err);
    });


  let currencyType = "USD";  
  let fromDate = "2021-05-23";
  let toDate = "2021-08-31";
  // I decided to do a button instead

  document.querySelector("button").onclick = () => {
    // get the value of the input field
    fromDate = document.getElementById("start-date").value;
    toDate = document.getElementById("end-date").value;
    //let currency = document.getElementById("pick-currency").value;
    getDateAndCurrencyData();
    newChart.destroy();
  };

  document.getElementById("pick-currency").addEventListener('change', () => {
    newChart.destroy();
    currencyType = document.getElementById("pick-currency").value;
    getDateAndCurrencyData();
    console.log("load");
  })

  const getDateAndCurrencyData = () => {
    axios
      .get(
        `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currencyType}`
      )
      .then((response) => {
        console.log(response.data);
        printChart(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
