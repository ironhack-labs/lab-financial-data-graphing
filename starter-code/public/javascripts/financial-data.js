const baseUrl = "https://api.coindesk.com/v1/bpi";
const ctx = document.getElementById("chart").getContext("2d");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
let chart;

const redCol = randomNum();
const greenCol = randomNum();
const blueCol = randomNum();

function randomNum(maxNum = 256) {
  return Math.floor(Math.random() * maxNum);
}

function removeData() {
  chart.data.labels = [];
  chart.data.datasets[0].data = [];
  // chart.update();
}

function updateData(labels, data) {
  chart.data.labels = labels;
  chart.data.datasets[0].data = data;
}

function updateChart(labels, data) {
  removeData();
  updateData(labels, data);
  chart.update();
}

function recoverLabelsAndData(resAPI) {
  let labels = [];
  let data = [];
  for (const key in resAPI) {
    labels.push(key);
    data.push(resAPI[key]);
  }
  return [labels, data];
}

function dateChange(e) {
  axios
    .get(
      `${baseUrl}/historical/close.json?start=${startDate.value}&end=${
        endDate.value
      }`
    )
    .then(res => {
      let [bpiDates, bpiValues] = recoverLabelsAndData(res.data.bpi);
      updateChart(bpiDates, bpiValues);
      startDate.value = bpiDates[0];
      endDate.value = bpiDates[bpiDates.length - 1];
    })
    .catch(err=>{
      console.log("Error al actualizar fechas y recuperar datos de API de coindesk");
    });
}

window.onload = function() {
  startDate.onchange = dateChange;
  endDate.onchange = dateChange;
  axios
    .get(`${baseUrl}/historical/close.json`)
    .then(res => {
      let [bpiDates, bpiValues] = recoverLabelsAndData(res.data.bpi);

      startDate.value = bpiDates[0];
      endDate.value = bpiDates[bpiDates.length - 1];

      chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: bpiDates,
          datasets: [
            {
              label: "Bitcoin Price Index",
              backgroundColor: `rgb(${redCol}, ${greenCol}, ${blueCol})`,
              borderColor: `rgb(${redCol}, ${greenCol}, ${blueCol})`,
              data: bpiValues
            }
          ]
        }
      });
    })
    .catch(err => {
      console.log("Error al recuperar datos de API de coindesk");
    });
};
