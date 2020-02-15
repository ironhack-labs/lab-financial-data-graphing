let chart;
const dateFrom = document.querySelector("#dateFrom");
const dateTo = document.querySelector("#dateTo");

console.log(dateFrom, dateTo);

function goDataShow() {
  const dateFromValue = dateFrom.value;
  const dateToValue = dateTo.value;
  const baseURL = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFromValue}&end=${dateToValue}`;

  function getDataAndShow(baseURL) {
    axios
      .get(baseURL)
      .then(showData => {
        console.log(showData.data["bpi"]);
        showGraphChart(showData.data);
      })
      .catch(err => console.log(err));
  }

  function showGraphChart(data) {
    const dataApi = data["bpi"];
    const keys = Object.keys(dataApi);
    const values = Object.values(dataApi);
    console.log("hola");

    const ctx = document.getElementById("theChart").getContext("2d");
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: keys,
        datasets: [
          {
            label: "Value",
            backgroundColor: "rgb(255, 154, 0)",
            borderColor: "rgb(255, 255, 255)",
            fill: true,
            data: values
          }
        ]
      }
    });
  }
  getDataAndShow(baseURL);
}

dateFrom.addEventListener("change", () => {
  chart.destroy();
  goDataShow();
});

dateTo.addEventListener("change", () => {
  chart.destroy();
  goDataShow();
});

goDataShow();
