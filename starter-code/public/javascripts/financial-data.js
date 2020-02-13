const dateFromId = document.querySelector("#dateFrom");
const dateToId = document.querySelector("#dateTo");

function chartMaster() {
  const dateFrom = dateFromId.value;
  const dateTo = dateToId.value;
  const baseURL = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`;

  function getDataAndPrint(baseURL) {
    axios
      .get(baseURL)
      .then(dataPayload => {
        console.log(dataPayload.data);
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
    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
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

  getDataAndPrint(baseURL);
}

dateFromId.addEventListener("change", chartMaster);

dateToId.addEventListener("change", chartMaster);

chartMaster();
