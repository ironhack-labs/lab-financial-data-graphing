// Iteration 1 and 2:
axios
  .get(`https://api.coindesk.com/v1/bpi/historical/close.json`)
  .then((apiResponse) => {
    //console.log("response data: ", apiResponse.data.bpi);
    formatData(apiResponse.data.bpi);
  })
  .catch((error) => {
    console.log(error);
  });

function formatData(bpi) {
  const bitcoinData = bpi;
  //console.log(bitcoinData);

  const bpiDates = Object.keys(bitcoinData);
  console.log(typeof bpiDates);
  console.log(bpiDates);

  const bpiPrices = Object.values(bitcoinData);
  //console.log(bpiPrices);

  const ctx = document.getElementById("myChart").getContext("2d");
  renderChart(ctx, bpiPrices, bpiDates);
}

function renderChart(canvas, prices, dates) {
  const chart = new Chart(canvas, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Bitcoin Price Chart",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: prices,
        },
      ],
    },
  });
}

function dateRangeURL(startDate, endDate) {
  axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=` +
        `${startDate}` +
        `&end=` +
        `${endDate}`
    )
    .then((apiResponse) => {
      //console.log("response data: ", apiResponse.data.bpi);
      formatData(apiResponse.data.bpi);
    })
    .catch((error) => {
      console.log(error);
    });
}

/* event listener */
document
  .getElementsByName("startDateInput")[0]
  .addEventListener("change", () => {
    let newStartDate = document.getElementsByName("startDateInput")[0];
    console.log("new start date: ", newStartDate.value);
    let currentEndDate = document.getElementsByName("endDateInput")[0];
    dateRangeURL(newStartDate, currentEndDate);
  });

document.getElementsByName("endDateInput")[0].addEventListener("change", () => {
  let newEndDate = document.getElementsByName("endDateInput")[0];
  console.log("new end date: ", newEndDate.value);
  let currentStartDate = document.getElementsByName("startDateInput")[0];
  dateRangeURL(currentStartDate, newEndDate);
});
