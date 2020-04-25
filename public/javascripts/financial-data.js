document.querySelector(".start").onchange = () => {
  event.preventDefault();
  let start = document.querySelector(".start").value;
  let end = document.querySelector(".end").value;
  let curr = document.querySelector("select").value;
  const baseUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&&currency=${curr}`;
  axios
    .get(baseUrl)
    .then((response) => {
      drawChart(response.data.bpi);
    })
    .catch((err) => {
      console.log(err);
    });
};
document.querySelector(".end").onchange = () => {
  event.preventDefault();
  let start = document.querySelector(".start").value;
  let end = document.querySelector(".end").value;
  let curr = document.querySelector("select").value;
  console.log(curr);
  const baseUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&&currency=${curr}`;
  axios
    .get(baseUrl)
    .then((response) => {
      drawChart(response.data.bpi);
    })
    .catch((err) => {
      console.log(err);
    });
};

function drawChart(data) {
  const labelX = Object.keys(data);
  const labelY = Object.values(data);
  let min = Math.min(...labelY);
  let max = Math.max(...labelY);
  let maxText = document.createElement("h3");
  maxText.innerHTML = `Max: ${max}`;
  let minText = document.createElement("h3");
  minText.innerHTML = `Min: ${min}`;
  console.log(maxText, minText);

  document.querySelector(".extreme-values").append(maxText, minText);

  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labelX,
      datasets: [
        {
          label: "Bitcoin Price Index",
          data: labelY,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
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
