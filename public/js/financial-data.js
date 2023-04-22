const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");
let chart = null;

const fromDateElement = document.getElementById("fromDate");
const toDateElement = document.getElementById("toDate");
const currencyElement = document.getElementById("currency");

const minValueElement = document.getElementById("minValue");
const maxValueElement = document.getElementById("maxValue");

[fromDateElement, toDateElement, currencyElement].forEach((element) =>
  element.addEventListener("change", (event) => {
    refreshData();
  })
);

function refreshData() {
  axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate.value}&end=${toDate.value}&currency=${currency.value}`
    )
    .then((response) => {
      if (chart) chart.destroy();
      if (response.data.bpi) {
        chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: Object.keys(response.data.bpi),
            datasets: [
              {
                label: "Price",
                data: Object.values(response.data.bpi),
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
      minValueElement.innerHTML = Math.min(...Object.values(response.data.bpi));
      maxValueElement.innerHTML = Math.max(...Object.values(response.data.bpi));
    })
    .catch((err) => console.log("error loading data", err));
}
refreshData();
