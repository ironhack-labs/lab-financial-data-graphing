const BPI_API_URL_BASE = "http://api.coindesk.com/v1/bpi/historical/close.json";

const dateRange = "?start=2022-06-01&end=2022-06-30";

axios
  .get(`${BPI_API_URL_BASE}${dateRange}`)
  .then((data) => {
    console.log("Data for chosen date range: ", data.data.bpi);
    console.log("Dates: ", Object.keys(data.data.bpi));
    console.log("Values: ", Object.values(data.data.bpi));

    const datesArr = Object.keys(data.data.bpi);
    const valuesArr = Object.values(data.data.bpi);

    printTheChart(datesArr, valuesArr);
  })
  .catch((err) => {
    console.log("Something went wrong", err);
  });

// ***Y-axis will represent the bitcoin value****   ?currency=<VALUE>The currency to return the data in, specified in ISO 4217 format. Defaults to USD.

// ***X-axis will represent the date of each value**?start=<VALUE>&end=<VALUE> Allows data to be returned for a specific date range. Must be listed as a pair of start and end parameters, with dates supplied in the YYYY-MM-DD format, e.g. 2013-09-01 for September 1st, 2013.

function printTheChart(yAxisValues, xAxisDates) {
  //   const dailyData = stockData["Time Series (Daily)"];

  //   const stockDates = Object.keys(dailyData);
  //   const stockPrices = stockDates.map((date) => dailyData[date]["4. close"]);

  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: yAxisValues,
      datasets: [
        {
          label: "Value",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: xAxisDates,
        },
      ],
    },
  });
}
