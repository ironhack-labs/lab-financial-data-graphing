const url = "http://api.coindesk.com/v1/bpi/historical/close.json";

axios
  .get(url)
  .then((response) => {
    console.log("response:", response);
    let date = Object.keys(response.data.bpi);
    let value = Object.values(response.data.bpi);
    createChart(date, value);
  })
  .catch((error) => {
    console.log(error);
  });

function createChart(x, y) {
  const ctx = document.getElementById("myChart");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: x,
      datasets: [
        {
          label: "Bitcoin price index",
          data: y,
          backgroundColor: "red",
          borderColor: "red",
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

const startDate = document.getElementById("start-date");
const endDate = document.getElementById("end-date");
const filter = document.getElementById("filters");

const dateUrl =
  "https://api.coindesk.com/v1/bpi/historical/close.json?start=startDate&end=endDate";
