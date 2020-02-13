let chart;
const dateFromId = document.querySelector("#dateFrom");
const dateToId = document.querySelector("#dateTo");
const currencyId = document.querySelector("#currency");
const maxId = document.querySelector("#max");
const minId = document.querySelector("#min");

function chartMaster() {
  const dateFrom = dateFromId.value;
  const dateTo = dateToId.value;
  const currency = currencyId.value;
  const baseURL = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}&currency=${currency}`;

  function getDataAndPrint(baseURL) {
    axios
      .get(baseURL)
      .then(dataPayload => {
        printTheChart(dataPayload.data);
      })
      .catch(err => console.log(err));
  }

  function printTheChart(data) {
    const dailyData = data["bpi"];
    const myKeys = Object.keys(dailyData);
    const myValues = myKeys.map(value => {
      return dailyData[value];
    });

    //Iteration max min values
    const sorter = myValues.sort((a, b) => a - b);
    const max = sorter[0];
    const min = sorter[myValues.length - 1];
    maxId.innerHTML = max + " " + currency;
    minId.innerHTML = min + " " + currency;

    console.log(myValues);
    const ctx = document.getElementById("myChart").getContext("2d");
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: myKeys,
        datasets: [
          {
            label: "Value",
            backgroundColor: "rgba(247,255,255, .7)",
            borderColor: "rgb(247,0,255)",
            fill: true,
            data: myValues
          }
        ]
      }
    });
  }

  getDataAndPrint(baseURL, currency);
}

dateFromId.addEventListener("change", function() {
  chart.destroy();
  chartMaster();
});

dateToId.addEventListener("change", function() {
  chart.destroy();
  chartMaster();
});

currencyId.addEventListener("change", function() {
  chart.destroy();
  chartMaster();
});

chartMaster();
