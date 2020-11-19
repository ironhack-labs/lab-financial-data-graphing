const url = "http://api.coindesk.com/v1/bpi/historical/close.json";
const ctx = document.getElementById("myChart").getContext("2d");

axios
  .get(url)
  .then((response) => {
    console.log(response.data.bpi);
    const labels = Object.keys(response.data.bpi);
    const data = Object.values(response.data.bpi);
    drawChart(labels, data);
  })
  .then(() => {
    const startDate = document.getElementById("start-date");
    const endDate = document.getElementById("end-date");
    let startDateInputValue;
    let endDateInputValue;

    startDate.addEventListener(labels, (data) => {
      startDate.onchange = (event) => {
        startDateInputValue = event.target.value;
      };
    });
    endDate.addEventListener(labels, (data) => {
      endDate.onchange = (event) => {
        endDateInputValue = event.target.value;
      };
    });
  })

  .catch((error) => {
    console.log(error);
  });

function drawChart(labels, data) {
  const ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Evolution of Bitcoin prices",
          data: data,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
