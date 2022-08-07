const BPI_API_URL_BASE = "http://api.coindesk.com/v1/bpi/historical/close.json";

/*****************************************************
 *************** SETTING DEFAULT DATES ***************
 ****************************************************** */
// TODAY
const today = new Date();
const todayIsoString = today.toISOString().slice(0, 10);
// console.log("TODAY: ", todayIsoString);

// 90 DAYS AGO
const ninetyDaysAgo = new Date(new Date().setDate(today.getDate() - 90));
const ninetyDaysAgoIsoString = ninetyDaysAgo.toISOString().slice(0, 10);
// console.log("90 DAYS AGO", ninetyDaysAgoIsoString);

let fromDate = ninetyDaysAgoIsoString;
let toDate = todayIsoString;
let currency = "USD";
let chart;

/*****************************************************
 *********** CREATING CHART ON FIRST LOAD ************
 ****************************************************** */

axios
  .get(
    `${BPI_API_URL_BASE}?start=${fromDate}&end=${toDate}&currency=${currency}`
  )
  .then((data) => {
    // console.log("Dates: ", Object.keys(data.data.bpi));
    // console.log("Values: ", Object.values(data.data.bpi));

    const datesArr = Object.keys(data.data.bpi);
    const valuesArr = Object.values(data.data.bpi);

    printTheChart(datesArr, valuesArr);
    setMinMax(data);
  })
  .catch((err) => {
    console.log("Something went wrong", err);
  });

/*****************************************************
 ********* EVENT LISTENERS FOR CHANGING DATE **********
 ****************************************************** */

const changeFromDate = document.getElementById("fromDate");

changeFromDate.addEventListener("change", () => {
  fromDate = changeFromDate.value;
  // console.log("Here is the new start date: ", fromDate);

  updateChart();
});

const changeToDate = document.getElementById("toDate");

changeToDate.addEventListener("change", () => {
  toDate = changeToDate.value;
  // console.log("Here is the new end date: ", toDate);

  updateChart();
});

/*****************************************************
 ****** EVENT LISTENERS FOR CHANGING CURRENCY ********
 ****************************************************** */

const changedCurrency = document.getElementById("currencySelector");

changedCurrency.addEventListener("change", () => {
  currency = changedCurrency.value;

  updateChart();
});

/*****************************************************
 ****************** PRINTING THE CHART ****************
 ****************************************************** */

function printTheChart(xAxisDates, yAxisValues) {
  const ctx = document.getElementById("myChart");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xAxisDates,
      datasets: [
        {
          label: "Bitcoin Price Index",
          backgroundColor: "#37BEB0",
          borderColor: "#37BEB0",
          data: yAxisValues,
          fill: {
            target: "origin",
            above: "rgba(164, 229, 224, .6)",
          },
        },
      ],
    },
  });
}

/*****************************************************
 ****************** UPDATING THE CHART ****************
 ****************************************************** */

function updateChart() {
  axios
    .get(
      `${BPI_API_URL_BASE}?start=${fromDate}&end=${toDate}&currency=${currency}`
    )
    .then((data) => {
      //   console.log("Dates: ", Object.keys(data.data.bpi));
      //   console.log("Values: ", Object.values(data.data.bpi));

      const datesArr = Object.keys(data.data.bpi);
      const valuesArr = Object.values(data.data.bpi);

      // console.log("Infos for update: ", data.data);

      chart.destroy();
      printTheChart(datesArr, valuesArr);
      setMinMax(data);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
}

/*****************************************************
 ************* DISPLAYING MIN & MAX VALUES ***********
 ****************************************************** */

function setMinMax(data) {
  const currentData = data.data.bpi;
  // console.log("Current Data: ", currentData);
  const valuesArr = Object.values(data.data.bpi);

  const maxValue = Math.max(...valuesArr);
  const minValue = Math.min(...valuesArr);

  // console.log(`Max: ${maxValue}, Min: ${minValue}`);

  document.getElementById(
    "maxValue"
  ).innerText = `Max: ${maxValue} ${currency}`;
  document.getElementById(
    "minValue"
  ).innerText = `Min: ${minValue} ${currency}`;
}
