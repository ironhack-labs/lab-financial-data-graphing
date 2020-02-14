const dateFromDomEl = document.querySelector("#fromDate");
const dateToDomEl = document.querySelector("#toDate");
const currencyDomEl = document.querySelector("#currency");

const minId = document.querySelector("#min");
const maxId = document.querySelector("#max");

function chartMaster() {
  const dateFrom = dateFromDomEl.value;
  const dateTo = dateToDomEl.value;
  const currency = currencyDomEl.value;

  const baseURL = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}&currency=${currency}`;

  function getDataAndPrint(baseURL, currency) {
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

        const min = Math.min(...myValues);
        const max = Math.max(...myValues);
        maxId.innerHTML = max + " " + currency;
        minId.innerHTML = min + " " + currency;
      })
      .catch(err => console.log(err));
  }
  getDataAndPrint(baseURL, currency);
}
currencyDomEl.addEventListener("change", chartMaster);
dateFromDomEl.addEventListener("change", chartMaster);
dateToDomEl.addEventListener("change", chartMaster);
chartMaster();
