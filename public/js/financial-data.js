window.onload = () => {
  const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";
  let newChart;
  let minValue = 0;
  let maxValue = 0;
  let bitcoinValue;
  const printChart = (dataFromApi) => {
    const dailyData = dataFromApi["bpi"];
    //console.log(dailyData);
    // data for x axis
    const dates = Object.keys(dailyData);
    //console.log(dates);
    // data for y-axis
    bitcoinValue = dates.map((dailyValue) => {
      return dailyData[dailyValue];
    });
    // console.log(bitcoinValue);
    const ctx = document.querySelector("#myChart").getContext("2d");
    minValue = Math.min(...bitcoinValue);
    maxValue = Math.max(...bitcoinValue);
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
      document.querySelector('#minVal').innerText = `Min Value: ${minValue}`;
      document.querySelector('#maxVal').innerText = `Min Value: ${maxValue}`;
    })
    .catch((err) => {
      console.log(err);
    });

  // changing dates and currency type

  let currencyType = "USD";  
  let fromDate = "2021-05-23";
  let toDate = "2021-08-31";

  document.getElementById("start-date").addEventListener('change', () => {
    newChart.destroy();
    fromDate = document.getElementById("start-date").value;
    getDateAndCurrencyData();
  })

  document.getElementById("end-date").addEventListener('change', () => {
    newChart.destroy();
    toDate = document.getElementById("end-date").value;
    getDateAndCurrencyData();
  })

  document.getElementById("pick-currency").addEventListener('change', () => {
    newChart.destroy();
    currencyType = document.getElementById("pick-currency").value;
    getDateAndCurrencyData();
  })

  const getDateAndCurrencyData = () => {
    axios
      .get(
        `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currencyType}`
      )
      .then((response) => {
        console.log(response.data);
        printChart(response.data);
        document.querySelector('#minVal').innerText = `Min Value: ${minValue}`;
        document.querySelector('#maxVal').innerText = `Min Value: ${maxValue}`;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
