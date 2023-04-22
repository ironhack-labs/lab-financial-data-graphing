document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myChart");
  const ctx = canvas.getContext("2d");

  const fromDateElement = document.getElementById("fromDate");
  const toDateElement = document.getElementById("toDate");

  let chart;

  [fromDateElement, toDateElement].forEach((element) =>
    element.addEventListener("change", (event) => {
      refreshData();
    })
  );

  function refreshData() {
    axios
      .get(
        "http://api.coindesk.com/v1/bpi/historical/close.json?start=2022-01-01&end=2023-01-01&currency=USD"
      )
      .then(function (response) {
        console.log("response=", response);

        if (chart) {
          chart.destroy();
        }

        chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: Object.keys(response.data.bpi),
            datasets: [
              {
                label: "Prix du bitcoin",
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
      })
      .catch((err) => console.log(err));
  }

  refreshData();
});
