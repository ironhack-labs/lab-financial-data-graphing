const dateFromDomEl = document.querySelector("#fromDate");
const dateToDomEl = document.querySelector("#toDate");

function chartMaster() {
  const dateFrom = dateFromDomEl.value;
  const dateTo = dateToDomEl.value;
  const baseURL = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`;

  function getDataAndPrint(baseURL) {
    axios
      .get(baseURL)
      .then(dataPayload => {
        console.log(dataPayload.data.bpi);
        const myKeys = Object.keys(dataPayload.data.bpi);
        const myValues = myKeys.map(date => {
          return dataPayload.data.bpi[date];
        });

        const ctx = document.getElementById("myChart").getContext("2d");
        if (window.bar != undefined) window.bar.destroy();
        window.bar = new Chart(ctx, {
          type: "line",
          data: {
            labels: myKeys,
            datasets: [
              {
                label: "Bitcoin Price Index",
                data: myValues,
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    stepSize: 500
                  }
                }
              ]
            }
          }
        });
      })
      .catch(err => console.log(err));
  }
  getDataAndPrint(baseURL);
}
dateFromDomEl.addEventListener("change", chartMaster);
dateToDomEl.addEventListener("change", chartMaster);
chartMaster();
